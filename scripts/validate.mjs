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

const problems = [];
if (!validate(data)) {
  for (const e of validate.errors) problems.push(`${e.instancePath || '/'} ${e.message}`);
} else {
  const { techniques, _meta } = data;
  if (_meta.entries !== techniques.length) problems.push(`_meta.entries is ${_meta.entries}, found ${techniques.length}`);
  const seen = new Set();
  for (const t of techniques) {
    if (seen.has(t.id)) problems.push(`duplicate id ${t.id}`);
    seen.add(t.id);
    if (t.secondary_tiers.includes(t.tier)) problems.push(`${t.id}: secondary_tiers repeats tier`);
    for (const s of [...t.caveats, ...t.watch]) if (!t.note.includes(s)) problems.push(`${t.id}: "${s}" is not a verbatim fragment of note`);
    if (t.tier === 'T5' && t.action === 'allow') problems.push(`${t.id}: T5 entry may not be action=allow`);
  }
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`patent-tiers.json valid: ${data.techniques.length} entries`);
