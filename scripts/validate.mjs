// Validates agent-pack/patent-tiers.json against its JSON Schema, plus the
// invariants a schema cannot express. Exit 1 on any problem.
import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const read = (p) => JSON.parse(fs.readFileSync(new URL(`../agent-pack/${p}`, import.meta.url), 'utf8'));
const data = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2], 'utf8')) : read('patent-tiers.json');
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(read('patent-tiers.schema.json'));

// Registry name normalisation: PEP 503 for PyPI, hyphen/underscore equivalence for crates.
const normalise = (eco, n) => (eco === 'pypi' ? n.replace(/[-_.]+/g, '-') : eco === 'cargo' ? n.replace(/_/g, '-') : n);

// Every entry must carry evidence, and every patent number quoted in note/caveats/watch needs an
// evidence entry with a URL whose claim or URL names that number.
const PATENT_NO = /(?:US|EP|WO)s?[0-9][0-9,/ ]{4,}[0-9]/g;
const digits = (s) => s.replace(/D/g, "");
function evidenceProblems(t) {
  const out = [];
  const ev = t.evidence ?? [];
  if (ev.length === 0) out.push(`${t.id}: has no evidence`);
  for (const e of ev) if (e.accessed > t.researched) out.push(`${t.id}: evidence accessed ${e.accessed} is after researched ${t.researched}`);
  const text = [t.note, ...t.caveats, ...t.watch].join(" ");
  for (const n of new Set((text.match(PATENT_NO) ?? []).map(digits))) {
    if (!ev.some((e) => digits(`${e.claim} ${e.url}`).includes(n))) out.push(`${t.id}: patent number ${n} in note has no evidence entry naming it`);
  }
  return out;
}

const problems = [];
if (!validate(data)) {
  for (const e of validate.errors) problems.push(`${e.instancePath || '/'} ${e.message}`);
} else {
  const { techniques, _meta } = data;
  if (_meta.entries !== techniques.length) problems.push(`_meta.entries is ${_meta.entries}, found ${techniques.length}`);
  const seen = new Set();
  const owner = new Map();
  for (const t of techniques) {
    if (seen.has(t.id)) problems.push(`duplicate id ${t.id}`);
    seen.add(t.id);
    if (t.secondary_tiers.includes(t.tier)) problems.push(`${t.id}: secondary_tiers repeats tier`);
    for (const s of [...t.caveats, ...t.watch]) if (!t.note.includes(s)) problems.push(`${t.id}: "${s}" is not a verbatim fragment of note`);
    if (t.tier === 'T5' && t.action === 'allow') problems.push(`${t.id}: T5 entry may not be action=allow`);
    problems.push(...evidenceProblems(t));
    for (const [eco, names] of Object.entries(t.match)) {
      for (const n of names) {
        if (n !== n.toLowerCase()) problems.push(`${t.id}: match.${eco} "${n}" must be lowercase`);
        if (eco === 'maven' && n.split(':').length !== 2) problems.push(`${t.id}: match.maven "${n}" must be group:artifact`);
        const key = `${eco}:${normalise(eco, n)}`;
        if (owner.has(key) && owner.get(key) !== t.id) problems.push(`${t.id}: match.${eco} "${n}" is already claimed by ${owner.get(key)}`);
        owner.set(key, t.id);
      }
    }
  }
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`patent-tiers.json valid: ${data.techniques.length} entries`);
