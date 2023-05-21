const path = require('path');
const { readFile, writeFile } = require('node:fs/promises');

const run = require('./run');

(async function runUnitTests() {
  try {
    const p = path.join(process.cwd(), './package.json');
    const pkg = JSON.parse(await readFile(p));

    pkg.type = 'module';

    await writeFile(
      p,
      JSON.stringify(pkg, null, 2)
    );

    try {
      await run({
        cmd: './node_modules/.bin/ava'
      });
    } catch (err) {
      console.log('Error running tests', err);
    }

    pkg.type = 'commonjs';

    await writeFile(
      path.join(process.cwd(), './package.json'),
      JSON.stringify(pkg, null, 2)
    );

  } catch (err) {
    console.log(err);
  }

})();
