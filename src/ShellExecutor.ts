import childProcess from 'child_process'
const exec = childProcess.execSync;

/**
 * Function for executing shell commands
 * from JavaScript
 * @param command The command that should be executed
 * @returns The result of the command
 */
export const executeCommand = (command: string) => {
    return exec(command, { encoding: 'utf-8'});
}
