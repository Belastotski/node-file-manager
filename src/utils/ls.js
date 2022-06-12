import { readdir } from "fs";
import { stderr, stdout } from "process";

let dir = process.argv[2];

try {
    readdir(dir, (err,files) => {
        if (err) stderr.write(err.name);
        files.forEach(file => stdout.write(file + '\n'));
    })
    
}
catch (err) {
    stderr.write(err);
}
