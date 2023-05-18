import path from 'path';
import { writeFile } from 'node:fs/promises';

import pkg from '../package.json' assert {type: 'json'};

(async function unitTestTeardown() {
  try {
    delete pkg.type;

    await writeFile(
      path.join(process.cwd(), './package.json'),
      JSON.stringify(pkg, null, 2)
    );

  } catch (err) {
    console.log('TEST TEARDOWN FAILED:', err);
  }
})();
