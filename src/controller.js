import {commands} from '../src/commandList.js';
import { Transform } from 'stream';
import { fork } from 'node:child_process';

const cpKill = (cp,time = 1000) => {
    setTimeout(() => {
        cp.kill();
    },time + 'ms')
}

export default function controller(command, ...args)
{
    return commands(command).then(path => {
        return new Promise((resolve, reject) => {
            let cp = fork(path, [...args], {stdio: 'pipe'});
            cp.on('message', ({dir, ask }) => {
                    if (dir) {
                    cp.kill();
                    cp.stdout.destroy();
                    resolve(dir);
                    } else if (ask) {
                        cp.stdin.write(global[ask]); 
                    }
                });

                const errorControl = new Transform({
                    transform(chunk, encoding, callback) {
                        console.log('transform: ' + chunk);
                    const newChank = (chunk.toString().trim() == 'Invalid input'?  'Invalid input' : 'Operation failed')  + '\r\n';
                      callback(null, newChank);
                    },
                  });

            cp.stdout.pipe(process.stdout);
            cp.stderr.pipe(errorControl).pipe(process.stderr);
            
            
            cp.stdout.on('end', e => {
                cp.kill();
            } )

            cp.stdout.on('data', e => {
                if (!cp.stdout.read()) cp.kill();
            } );

            cp.stderr.on('data', e => {
                cpKill(cp);
            } );
            cp.on('close', () => {
                console.log('close cp')
                cp.stderr.destroy();
                cp.stdout.destroy();
                resolve(global.workDir)
            });  
            });
        }).catch(e => console.log(e.message));
}