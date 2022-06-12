import {commands} from '../src/commandList.js';
// import {InputError, OperationError} from '../src/errors.js';
import { Transform } from 'stream';
import { fork } from 'node:child_process';

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

                const errorControl = new Transform({
                    transform(chunk, encoding, callback) {
                    const newChank = (chunk.toString().trim() == 'Invalid input'?  'Invalid input' : 'Operation failed')  + '\r\n';
                      callback(null, newChank);
                    },
                  });

            cp.stdout.pipe(process.stdout);
            cp.stderr.pipe(errorControl).pipe(process.stderr);

            cp.on('error', (err) => reject(err));
            cp.on('close', () => resolve(global.workDir));  
            });
        }).catch(e => console.log((e.message)));
}