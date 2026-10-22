// Checks that every package name in agent-pack/patent-tiers.json `match` exists on its
// registry. Needs the network, so it is run by hand, not in CI. Existence is necessary,
// not sufficient: read the registry description before adding a name. Exit 1 on any miss.
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync(new URL('../agent-pack/patent-tiers.json', import.meta.url), 'utf8'));
const headers = { 'User-Agent': 'agent-safety-bed verify-match (https://github.com/ThinkersJournal/agent-safety-bed)' };
const url = {
  pypi: (n) => `https://pypi.org/pypi/${n.replace(/\[.*$/, '')}/json`,
  cargo: (n) => `https://crates.io/api/v1/crates/${n}`,
  npm: (n) => `https://registry.npmjs.org/${n.replace('/', '%2f')}`,
  maven: (n) => {
    const [g, a] = n.split(':');
    return `https://repo1.maven.org/maven2/${g.replaceAll('.', '/')}/${a}/maven-metadata.xml`;
  },
};
const exists = async (eco, n) => (await fetch(url[eco](n), { headers })).ok;

// Controls: a package that exists and one that cannot, per registry.
const controls = { pypi: ['requests', 'zz-no-such-pkg-qx'], cargo: ['serde', 'zz-no-such-pkg-qx'], npm: ['react', 'zz-no-such-pkg-qx'], maven: ['junit:junit', 'com.zz:no-such-qx'] };
const missing = [];
for (const [eco, [yes, no]] of Object.entries(controls)) {
  if (!(await exists(eco, yes)) || (await exists(eco, no))) missing.push(`control failed for ${eco}`);
}
let checked = 0;
for (const t of data.techniques) {
  for (const [eco, names] of Object.entries(t.match)) {
    for (const n of names) {
      checked++;
      if (!(await exists(eco, n))) missing.push(`${t.id}: ${eco} ${n} not found`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}
if (missing.length) {
  console.error(missing.join('\n'));
  process.exit(1);
}
console.log(`all ${checked} names exist (controls passed)`);
