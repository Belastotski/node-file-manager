import {join, parse } from "path";
import { stderr } from "process";
// import {InputError, OperationError} from '../errors.js';
// import { fileURLToPath } from 'url';


let dir = process.argv[2];
try {
    if (parse(dir).root !== dir)  dir = join(dir, '..');
    process.send({dir});
}
catch (err) {
    stderr.write(err.name);
}

