const { spawn } = require('node:child_process');

/**
 *
 * */
module.exports = function run({ cmd, args = [], shell = 'zsh'} = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: 'zsh'
    });
    p.on('exit', code => {
      resolve(code);
    });
    process.on('error', err => {
      reject(err);
    });
  });
}
