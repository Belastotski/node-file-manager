import { resolve as pResolve } from "path";
import { stderr } from "process";
import { stat } from "fs";
import { InputError } from '../errors.js';

let dir = process.argv[2];
let newDir = process.argv[3];
try {
    if (!newDir) throw new InputError();
    dir = pResolve(dir, newDir);
    stat(dir, err => ( err? stderr.write(err.name) :  process.send({dir})));
} catch (err) {
    process.stderr.write(err.name);
}
