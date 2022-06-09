import {commands} from '../src/commandList.js';
import {InputError} from '../src/errors.js';

export default function controller(command, ...args){
    return new Promise((resolve, reject) => {
        commands(command).then(resolve).catch(reject);
        ;
    } )
}
