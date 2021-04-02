export class PropertyRequiredError extends Error { /*...*/ }
export class NumberTypeError extends Error {/*...*/ }
export class DateFormatError extends Error { /*...*/ }

export class InputValidation {

    constructor(){  }

    noEmptyValidation(inputData: string) {
        var data = inputData.trim();
        if (!data) { throw new PropertyRequiredError( "Can\'t be empty." ) };
    }

    numberValidation(inputData: string) {
        var data = inputData.trim();
        if (!data) {
            throw new PropertyRequiredError("Can\'t be empty.");
        } else if (data.search(/^\d*$/) == -1) {
            throw new NumberTypeError("Must be a number.");
        }
    }

    dateValidation(inputData: string) {
        var data = inputData.trim();
        if (!data) {
            throw new PropertyRequiredError("Can\'t be empty.");
        } else {
            if (data.search(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) == -1) {
                throw new DateFormatError("Date format must be in: 'yyyy-mm-dd'");
            }
        }
    }
}