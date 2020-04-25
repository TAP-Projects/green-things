const homeRouter = require('./home');
const aboutRouter = require('./about');
const galleryRouter = require('./gallery');
const userRouter = require('./user');
const usersRouter = require('./users');

module.exports = app => {
    app.use('/', homeRouter);
    app.use('/about', aboutRouter);
    app.use('/gallery', galleryRouter);
    app.use('/sign-up', userRouter);
    app.use('/user', userRouter);
    app.use('/users', usersRouter);
}