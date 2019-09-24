const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    // To use Validator.isEmpty method all the parameters should be of string type.
    // So to convert all parameters of all possible types that may be(null,empty object or anything other that string); we have to use this below block of lines.
    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}