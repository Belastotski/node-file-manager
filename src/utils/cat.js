import { resolve } from "path";
import { stat } from "fs/promises";
import {createReadStream } from "fs";
import { InputError, OperationError} from '../errors.js';
import { getGlobalFromParent } from '../util.js';

let arg = process.argv[2];
try {
    if (!arg) throw new InputError();
} catch (err) {
    process.stderr.write(err.message);
}

getGlobalFromParent(process, 'workDir')
    .then( dir =>  resolve(dir, arg) )
    .then( async file => { 
        let fl = await stat(file).then();
        return {file, fl};
    })
    .then( ({file,fl}, err) => {
        if (err || !fl.isFile()) throw new OperationError()
        else {

            let stream = createReadStream(file);
            stream.pipe(process.stdout);
            // stream.on('end', e => stream.close(err => {
            //     if (err) {
            //         console.log(err);
            //         process.stderr.write(err.message)
            //     }
            //     else {
            //       stream.unpipe(process.stdout);
            //     }
            // }))
        
        }
    })
    .catch(err => process.stderr.write(err.message));