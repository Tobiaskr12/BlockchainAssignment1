import { executeCommand } from "./ShellExecutor"

/**
 * Prints the balance of the wallet
 */
export const checkBalance = () => {
    console.log(executeCommand("bitcoin-cli -regtest getbalance"));
}

/**
 * Creates a new address for the wallet
 */
export const createAddress = () => {
    console.log(executeCommand("bitcoin-cli -regtest getnewaddress"));
}

/**
 * Mine the specified amount of blocks and
 * adds the reward to the specified address
 */
export const mineBlocks = (address: string, amount: string) => {
    console.log(executeCommand(`bitcoin-cli -regtest generatetoaddress ${amount} ${address}`));
}

/**
 * Lists unspent transactions for the account
 */
export const listUnspentTransactions = () => {
    console.log(executeCommand("bitcoin-cli -regtest listunspent 0"));
}
