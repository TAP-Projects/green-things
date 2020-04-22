const { checks, handleValidationErrors } = require('./validationMiddlewear');

// Controllers to 

// I'm having some confusion about routes versus views. These routes are all about CRUD stuff for one kind of database entity - a user. They're all about creating, retrieving, updating, and deleting users. BUT! I don't have a route to a view for viewing a user's profile here.

// I have 4 routes, corresponding to 4 HTML verbs, corresponding to 4 db operations. I have a single view called 'sign up' that I need to behave differently when a new user navigates to it, versus when a logged in user navigates to it. When a new user visits, show the empty form. When a logged in user visits, show the filled in form and allow a user to edit details like name.

// Retrieve the sign up form page
const getUser = (req, res, next) => {
    // Is the user logged in?
    if(true){
        // Show the empty sign up form when a new user visits
        res.render('sign-up', { title: 'Green Things' });
    } else {
        // Show the filled in form when a logged in user visits

    }

}

// Create a user after submitting the sign up form page
const postUser = (req, res, next) => {
    res.render('sign-up', { title: 'Green Things' });
}

// Update a user using the same 'sign up' form page
const putUser = (req, res, next) => {
    res.render('sign-up', { title: 'Green Things' });
}

// Delete a user from the user-profile page, and redirect to a confirmation page.
const deleteUser = (req, res, next) => {
    res.redirect();
}

const userControllers = {
    getUser,
    postUser,
    putUser,
    deleteUser

}

module.exports = userControllers;