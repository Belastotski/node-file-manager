import {InputError, OperationError} from './errors.js';

export const getGlobalFromParent = ( cProcess, ask ) => {
    return new Promise((resolve, reject) => {
        cProcess.send({ask});
        cProcess.stdin.once('data', (data) => {
            if (data) resolve(data.toString());
            reject(new OperationError);
        })
    })
} 

export const checkArgs = (...args) => {
    return new Promise((resolve, reject) => {
        args.every(arg => arg !== undefined)
        ? resolve(args)
        : reject(new InputError)
    })

}