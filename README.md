# Blockchain Assignment 1 - Bitcoin
CLI for interacting with a limited subset of Bitcoin Core

## Install instructions
1. Make sure NodeJS is installed
2. From the root directory, run: `npm install`
3. From the root directory, run: `npm run build`
4. Run any of the commands. Example: `node dist/index.js check-balance`

## Testing
The tests assume that: 
1. The bitcoin daemon is running
2. No wallet has been loaded yet
3. The daemon is set to run in regtest mode.
4. The program has been built using the command `npm run build`

The easiest way to ensure the regtest environment is ready for testing is to
delete the 'regtest'-folder in the bitcoin data directory (the location is system-dependent) before starting the daemon.

The tests can be run by using the command: `npm test`
