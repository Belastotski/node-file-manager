import { resolve } from "path";
import zlib from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { stat } from "fs/promises";
import { getGlobalFromParent, checkArgs } from '../util.js';

getGlobalFromParent(process, 'workDir')
.then( async dir =>  {
    const files =  await checkArgs(process.argv[2],process.argv[3]);
    const oldFile = resolve(dir, files[0]);
    const newFile = resolve(dir, files[1]);
    let fl = await stat(oldFile).then();
    if (!fl.isFile()) throw new OperationError();
    return { oldFile, newFile, size : fl.size }
}).then(({oldFile, newFile , size }) => {
    createReadStream(oldFile).pipe(zlib.createBrotliDecompress()).pipe(createWriteStream(newFile));
    return 1;
}).catch(err => process.stderr.write(err.message));