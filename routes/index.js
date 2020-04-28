const homeRouter = require('./home');
const aboutRouter = require('./about');
const galleryRouter = require('./gallery');
const userRouter = require('./user');
const thankYouRouter = require('./thank-you');
const usersRouter = require('./users');

module.exports = app => {
    app.use('/', homeRouter);
    app.use('/about', aboutRouter);
    app.use('/gallery', galleryRouter);
    app.use('/sign-up', userRouter);
    app.use('/thank-you', thankYouRouter);
    app.use('/user', userRouter);
    app.use('/users', usersRouter);
}