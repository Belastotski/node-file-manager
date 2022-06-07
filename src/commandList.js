export const commandList = {
    up : 'up',
};

export function hasCommand(command) {
    return commandList.hasOwnProperty(command);
}