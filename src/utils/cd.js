import { dirname, join,resolve as pResolve, parse } from "path";
import {InputError, OperationError} from '../errors.js';
import { fileURLToPath } from 'url';

let dir = process.argv[2];
try {
    if (parse(dir).root !== dir)  dir = join(dir, '..');
    process.send({ undefined , undefined , dir});
}
catch (err) {
    process.send({err});
}