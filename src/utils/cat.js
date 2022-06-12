import { resolve } from "path";
import { stat } from "fs/promises";
import {createReadStream } from "fs";
import { InputError, OperationError} from '../errors.js';

let dir = process.argv[2];
let file = process.argv[3];
try {
    if (!file) throw new InputError();
    file = resolve(dir, file);
    stat(file).then((fl,err) => {
        if (err || !fl.isFile()) throw new OperationError()
        else createReadStream(file).pipe(process.stdout) 
        
    }).catch(err => process.stderr.write(err.message))
} catch (err) {
    process.stderr.write(err.message);
}