# Express and Postgres Projects

## Learning Postgres AKA Green Things

### Express

#### Misc
- Write pagination middleware
- Write validation and sanitizing middleware for users
- Figure out how to post a simple form to Express
- Switch synchronous functions to async in app and routes. E.g. my db.query() calls are using callbacks right now
- Add some sort of success indicator to the sign up form
- Send email on successful sign up
- Ask for email verification?


#### Views
- Create a form/edit view for green things
- Create a single thing view
- Add pagination to gallery and users

##### Front End JS
- Write burger script
- Write the class switching script for the form validation

#### Routes

##### User Routes
- Create edit user route
- Create delete user route
- Create admin only list all users route
- DONE: Create create user route
- DONE: Create view user route (can't yet edit or delete)
##### Thing Routes
- Create single thing route
- Create create thing route
- Create edit thing route
- Create delete thing route
- DONE: Create gallery route (just loading static stuff)

#### DB Connect
- Re-read the project structure article on the Node-Postgres site
- Read about granting privileges
- DONE: Write the pool script and export an object
- DONE: Test the pool script. NOTE: It's not enough to create the db, create the tables, and seed some data. You also need to grant privileges to the public to use SELECT on each table. 

### DB
#### Local
- Write an npm script to create tables and seed the database
- Figure out how to configure a development db as distinct from staging, testing, and production dbs
- DONE: Create a green_things database
- DONE: Create models for the green_user and green_thing tables
- DONE: Create a list of green things
- DONE: Create a list of users
#### Heroku
- DONE: Create a database
- Figure out how to connect to the production db on Heroku only
