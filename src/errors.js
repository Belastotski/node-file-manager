export class InputError extends Error {
    constructor(){
        super();
        this.message = 'Invalid input\n';
    }
}
export class OperationError extends Error {
    constructor(){
        super();
        this.message = 'Operation failed\n';
    }
}




