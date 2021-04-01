export class ReadError extends Error {
    cause: string;
    constructor(message: string, cause: string) {
        super(message);
        this.cause = cause;
        this.name = 'ReadError';
    }
}

export class ValidationError extends Error { /*...*/ }
export class PropertyRequiredError extends ValidationError { /*...*/ }
export class NumberTypeError extends ValidationError {/*...*/ }
export class DateFormatError extends ValidationError { /*...*/ }

export class InputValidation {

    constructor(){  }

    noEmptyValidation(inputData: string) {
        var data = inputData.trim();
        if (!data) { throw new PropertyRequiredError( "Can\'t be empty." ) };
    }

    numberValidation(inputData: string) {
        var data = inputData.trim();
        if (!data) {
            return "Can\'t be empty.";
        } else if (data.search(/^\d*$/) == -1) {
            return "Must be a number.";
        }
    }

    dateValidation(inputData: string) {
        var data = inputData.trim();
        if (!data) {
            return "Can\'t be empty.";
        } else {
            if (data.search(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) == -1) {
                return "Date format must be 'yyyy-mm-dd'";
            }
        }
    }
}