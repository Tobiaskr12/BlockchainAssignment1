import { Command } from "commander";
import { checkBalance, createAddress, listUnspentTransactions, mineBlocks } from "./BtcCoreService";
const program = new Command()

/**
 * Program description
 */
program
    .name('Blockchain Assignment 1')
    .description('CLI to interact with a subset of Bitcoin Core')
    .version('1.0.0');

/**
 * Commands that the program accepts:
 * - help
 * - check-balance
 * - create-address
 * - mine-blocks
 * - list-unspent
 * Usage example: node dist/index.js check-balance
 */
program.command('check-balance')
    .description('get the balance of your wallet')
    .action(checkBalance);

program.command('create-address')
    .description('create a new address for your wallet')
    .action(createAddress);

program.command('mine-blocks')
    .description('add Bitcoin to an address by mining blocks')
    .argument('<address>', 'address that should receive the Bitcoin')
    .argument('<amount>', 'the amount of blocks that should be mined')
    .action((address, amount) => mineBlocks(address, amount));

program.command('list-unspent')
    .description('list all unspent transactions')
    .action(listUnspentTransactions);
    
program.parse();
