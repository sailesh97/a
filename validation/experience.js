const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    // To use Validator.isEmpty method all the parameters should be of string type.
    // So to convert all parameters of all possible types that may be(null,empty object or anything other that string); we have to use this below block of lines.
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title is required';
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}