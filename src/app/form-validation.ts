export class PropertyRequiredError extends Error {
  /*...*/
}
export class NumberTypeError extends Error {
  /*...*/
}
export class DateFormatError extends Error {
  /*...*/
}

export class InputValidation {
  constructor() {}

  noEmptyValidation(inputData: string) {
      var data = inputData.trim();
    if (!data) {
      throw new PropertyRequiredError("Can't be empty.");
    }
  }

  numberValidation(inputData: string) {
      var data = inputData.trim();

    if (!data) {
      throw new PropertyRequiredError("Can't be empty.");
    } else if (data.search(/^\d*$/) == -1) {
      throw new NumberTypeError('Must be a number.');
    }
  }

  dateValidation(inputData: string) {
    var data = inputData.trim();
    if (!data) {
      throw new PropertyRequiredError("Can't be empty.");
    } else {
      if (
        data.search(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) ==
        -1
      ) {
        throw new DateFormatError("Date format must be in: 'yyyy-mm-dd'");
      }
    }
  }
}

export class FieldValidation extends InputValidation {
  constructor() {
    super();
  }

  nameError: string;
  departmentError: string;
  dateError: string;
  picError: string;
  rankError: string;

  validationDone = false;

  nameCheck(input: string) {
    try {
      this.noEmptyValidation(input);
      this.validationDone = true;
      this.nameError = undefined;
    } catch (error) {
      this.nameError = error.message;
      this.validationDone = false;
    }
  }

  departmentCheck(input: string) {
    try {
      this.noEmptyValidation(input);
      this.validationDone = true;
      this.departmentError = undefined;
    } catch (error) {
      this.departmentError = error.message;
      this.validationDone = false;
    }
  }

  dateCheck(input: string) {
    try {
      this.dateValidation(input);
      this.validationDone = true;
      this.dateError = undefined;
    } catch (error) {
      this.dateError = error.message;
      this.validationDone = false;
    }
  }

  picCheck(input: string) {
    try {
      this.noEmptyValidation(input);
      this.validationDone = true;
      this.picError = undefined;
    } catch (error) {
      this.picError = error.message;
      this.validationDone = false;
    }
  }

  rankCheck(input: string) {
    try {
      this.numberValidation(input);
      this.validationDone = true;
      this.rankError = undefined;
    } catch (error) {
      this.rankError = error.message;
      this.validationDone = false;
    }
  }
}
