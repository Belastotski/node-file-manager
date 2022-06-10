import {commands} from '../src/commandList.js';
import {InputError, OperationError} from '../src/errors.js';
import { fork } from 'node:child_process';

export default function controller(command, ...args){
    return new Promise((resolve, reject) => {
        commands(command).then(async path => {
            let cp = fork(path,[global.workDir,...args], {silent:false});
            cp.once('message', message => {
                console.log(message);
                if (message.error) reject(message.error == 'input'? new InputError: new OperationError);
                else {
                global.workDir = message.dir;
                resolve(message.data);
                }
            });
        }).catch(reject);
    } )
}
