const path = require('path');
const { writeFile } = require('node:fs/promises');

const pkg = require('../package.json');

(async function unitTestSetup() {
  try {
    // Set the type to "module" so "imports" work.
    pkg.type = 'module';

    await writeFile(
      path.join(process.cwd(), './package.json'),
      JSON.stringify(pkg, null, 2)
    );

  } catch (err) {
    console.log('TEST SETUP FAILED:', err);
  }
})();
