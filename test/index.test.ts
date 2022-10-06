import {describe, expect, test} from '@jest/globals';
import { fail } from 'assert';
import { v4 as uuidv4 } from 'uuid';
import { executeCommand } from '../src/ShellExecutor';

/**
 * The tests assume that:
 * 1. The bitcoin daemon is running
 * 2. No wallet has been loaded yet
 * 3. The daemon is set to run in regtest mode.
 * 4. The program has been built using the command 'npm run build'
 * The easiest way to ensure the regtest environment is ready for
 * testing is to delete the 'regtest'-folder in the bitcoin data
 * directory (the location is system-dependent) before starting
 * the daemon.
 */

let testWalletId = uuidv4();

/**
 * Create a wallet with a newly generated uuid 
 * as a name, before all other tests are run
 */
beforeAll(() => {
    testWalletId = uuidv4();
    executeCommand(`bitcoin-cli -regtest createwallet "${testWalletId}"`);
});

describe('test available CLI commands', () => {
    let walletAddress: string | undefined;

    test('the command "check-balance" returns a balance of 0', () => {
        expect(+executeCommand('node ./dist/index.js check-balance')).toBe(0);
    });

    test('the command "create-address" should return an address with a length between 26-35 characters', () => {
        walletAddress = executeCommand('node ./dist/index.js create-address').trim();
        expect(walletAddress.length >= 26);
        expect(walletAddress.length <= 35);
    });

    test('the command "mine-blocks" should return an array containing n 64-character transaction ids', () => {
        if (walletAddress) {
            const transactionIds = executeCommand(`node ./dist/index.js mine-blocks ${walletAddress} 101`).split(",");
            
            for (let i = 0; i < transactionIds.length; i++) {
                expect(transactionIds[i].replace(/\W/g, '').trim().length).toBe(64);
            }
        } else {
            fail('No wallet address has been created, so the mined blocks cannot be added');
        }
    });

    test('the command "check-balance" now returns a number greater than 0', () => {
        expect(+executeCommand('node ./dist/index.js check-balance')).toBeGreaterThan(0);
    });

    test('the transactions count of the wallet should be 101', () => {
        expect(JSON.parse(executeCommand('bitcoin-cli -regtest getwalletinfo'))['txcount']).toBe(101);
    });

    test('after transferring funds to an address, the list of unspent transactions will have a length greater than 0', () => {
        const newWalletAddress = executeCommand('node ./dist/index.js create-address').trim();
        executeCommand(`bitcoin-cli -regtest sendtoaddress ${newWalletAddress} 0.00001`);
        expect(JSON.parse(executeCommand('node ./dist/index.js list-unspent')).length).toBeGreaterThan(0);
    });
});

/**
 * Unload the wallet after testing so new
 * tests can be run or so a wallet can 
 * manually be loaded
 */
afterAll(() => {
    executeCommand(`bitcoin-cli -regtest unloadwallet "${testWalletId}"`);
})