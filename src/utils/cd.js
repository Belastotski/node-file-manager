import { join,resolve as pResolve, parse } from "path";
import { stat } from "fs";
import {InputError, OperationError} from '../errors.js';
import { fileURLToPath } from 'url';

let dir = process.argv[2];
let newDir = process.argv[3];
try {
    if (!newDir) throw new InputError();
    dir = pResolve(dir, newDir);
    stat(dir, err => (process.send( err? {err} : { undefined , undefined , dir})))
}
catch (err) {
    process.send({err});
}