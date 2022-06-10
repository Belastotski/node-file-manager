import { dirname, join,resolve as pResolve, parse } from "path";
import { fileURLToPath } from 'url';


let dir = process.argv[2];
try {
    if (parse(dir).root !== dir)  dir = join(dir, '..');
    process.send({data: '', dir});
}
catch (err) {
    process.send({error: 'output'});
}

