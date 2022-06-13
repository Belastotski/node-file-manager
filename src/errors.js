export class InputError extends Error {
    constructor(){
        super();
        this.name = 'inputError';
        this.message = 'Invalid input\n';
    }
}
export class OperationError extends Error {
    constructor(){
        super();
        this.name = 'operationError'
        this.message = 'Operation failed\n';
    }
}




