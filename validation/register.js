const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // To use Validator.isEmpty method all the parameters should be of string type.
    // So to convert all parameters of all possible types that may be(null,empty object or anything other that string); we have to use this below block of lines.
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    // Let we wrote the 2nd if block 1st:
    // If name does not exist, error = "Name field is required"
    // And then due to the if block checking the length of name paameter, error.name will be replaced with "Name must be between 2 to 30 Characters"
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be atleast 6 characters';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match'; //if we will use errors.password2 here: even if we don't pass any value in Confirm Password field in our frontend , it will show 'Passwords must match" only.But the "Confirm Password field is required" message should be shown too.
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}