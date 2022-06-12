import {commands} from '../src/commandList.js';
import {InputError, OperationError} from '../src/errors.js';
import { fork, spawn } from 'node:child_process';

export default function controller(command, ...args)
{
    return commands(command).then(path => {
        return new Promise((resolve, reject) => {
            let cp = fork(path, [global.workDir,...args], {stdio: 'pipe'});
            cp.once('message', ({dir}) => {
                    cp.kill();
                    cp.stdout.destroy();
                    resolve(dir);
                });
            cp.stdout.pipe(process.stdout);
            cp.stderr.pipe(process.stderr);

            cp.on('error', (err) => reject(err));
            cp.on('close', () => resolve(global.workDir));  
            });
        }).catch(e => console.log('m1: ',e.message));
}