const { spawn } = require('child_process');

const NODE_BIN = '/Users/progritjinji003/.nvm/versions/node/v22.22.1/bin/node';
const NEXT_BIN = '/Users/progritjinji003/Desktop/progrit0003/node_modules/.bin/next';
const CWD = '/Users/progritjinji003/Desktop/progrit0003';

const env = {
  ...process.env,
  PATH: `/Users/progritjinji003/.nvm/versions/node/v22.22.1/bin:${process.env.PATH || ''}`,
};

const child = spawn(NODE_BIN, [NEXT_BIN, 'dev', '--webpack'], {
  env,
  cwd: CWD,
  stdio: 'inherit',
});

child.on('exit', (code) => process.exit(code || 0));
