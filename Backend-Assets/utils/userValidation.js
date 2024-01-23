const { check } = require("express-validator");

//Data Validation middleware
exports.validateUser = [
    check('username', "Please enter a valid username").not().isEmpty(),
    check('email', "please enter a valid email ")
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail({ gmail_remove_dots: true }),
    check('password', "Password must have at least one special character, one uppercase letter, and be at least 6 characters long").isStrongPassword({
        min: 6, minUppercase: 1, maxUppercase: 1
    }),
    check('phonenumber', "Mobile nummber must be 10 digits").isLength({ min: 10, max: 10 }),
    check("country", "Provide your country name ."),
    check("role", "Role is either mentor, mentee, or organization ").not().isEmpty().isIn(['mentor', 'mentee', 'organization'])
]


exports.validateSignInUser = [
    check('email', "please enter a valid email ")
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail({ gmail_remove_dots: true }),

    check('password').notEmpty().withMessage('Password is required')
];