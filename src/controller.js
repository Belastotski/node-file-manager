import {commands} from '../src/commandList.js';
import {InputError, OperationError} from '../src/errors.js';
import { fork } from 'node:child_process';

export default function controller(command, ...args){
    return new Promise((resolve, reject) => {
        commands(command).then(async path => {
            let cp = fork(path,[global.workDir,...args], {silent:false});
            cp.once('message', ({err,data,dir}) => {
                console.log('message: ',err,data,dir);
                if (err) reject(err == 'input'? new InputError: new OperationError);
                else { 
                    if (dir) global.workDir = dir;
                    resolve(data, cp);
                }
            });
        }).catch(reject);
    } )
}
