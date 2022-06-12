import { join,parse } from "path";
import { stat,open } from "fs/promises";
import {createReadStream } from "fs";
import { InputError, OperationError} from '../errors.js';

let dir = process.argv[2];
let file = process.argv[3];
try {
    if (!file) throw new InputError();
    if (parse(file).base !== file) throw new OperationError(); 
    file = join(dir, file);
    open(file, 'ax').then((fl) => fl.close()).catch(err => process.stderr.write(err.message))
} catch (err) {
    process.stderr.write(err.message);
}