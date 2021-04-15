import { Hero } from './hero';

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

  noEmptyValidation(inputData: string): string {
    var data = inputData.trim();

    if (!data) {
      return "Can't be empty.";
    } else {
      return 'pass';
    }
  }

  numberValidation(inputData: string): string {
    var data = inputData.trim();

    if (!data) {
      return "Can't be empty.";
    } else if (data.search(/^\d*$/) == -1) {
      return 'Must be a number.';
    } else {
      return 'pass';
    }
  }

  dateValidation(inputData: string): string {
    var data = inputData.trim();

    if (!data) {
      return "Can't be empty.";
    } else if (
      data.search(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) == -1
    ) {
      return "Date format must be: 'yyyy-mm-dd'";
    } else {
      return 'pass';
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

  // single input validations

  nameCheck(input: string) {
    var msg = this.noEmptyValidation(input);

    if (msg == 'pass') {
      this.nameError = '';
    } else {
      this.nameError = msg;
      throw new PropertyRequiredError(msg);
    }
  }

  departmentCheck(input: string) {
    var msg = this.noEmptyValidation(input);
    if (msg == 'pass') {
      this.departmentError = '';
    } else {
      this.departmentError = msg;
      throw new PropertyRequiredError(msg);
    }
  }

  dateCheck(input: string) {
    var msg = this.dateValidation(input);
    if (msg == 'pass') {
      this.dateError = '';
    }else if(msg.includes("Date format")){
      this.dateError = msg;
      throw new DateFormatError(msg);
    }else{
      this.dateError = msg;
      throw new PropertyRequiredError(msg);
    }
  }

  picCheck(input: string) {
    var msg = this.noEmptyValidation(input);
    if(msg == 'pass'){
      this.picError = '';
    }else{
      this.picError = msg;
      throw new PropertyRequiredError(msg);
    }
  }

  rankCheck(input: string) {
    var msg = this.numberValidation(input);
    if(msg == 'pass'){
      this.rankError = '';
    }else if(msg.includes('Must be')){
      this.rankError = msg;
      throw new NumberTypeError(msg);
    }else{
      this.rankError = msg;
      throw new PropertyRequiredError(msg);
    }
  }

  // bulk validation
  bulkValidator(obj: Hero) {
    this.nameCheck(obj.HeroName);
    this.departmentCheck(obj.Department);
    this.dateCheck(obj.DateOfJoining);
    this.picCheck(obj.PhotoFileName);
    this.rankCheck(obj.Rank.toString());
  }
}
