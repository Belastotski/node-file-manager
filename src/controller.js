import {commandList, hasCommand} from '../src/commandList.js';
import {InputError} from '../src/errors.js';

export default function controller(command, ...args){
    return new Promise((resolve, reject) => {
        if (!hasCommand(command)) reject(new InputError);
        resolve(command);
    } )
}
