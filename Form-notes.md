# Forms

## What a form process needs to do:

1. Write and serve the form (view, route)
2. Validate form entries as they are made on the front end (validate.js)
3. Supply helpful error message if necessary
4. Submit the form to a server script that will handle it (post route)
5. Sanitize and validate the form on the server end (express-validate)
6. Send back the form if it fails validation (express-validate)
7. Commit form data to the db (node-postgres in this case)
8. Send the user a success message

## Things I learned

### Does a form in an Express app need its encoding type to be multipart/form-data?
NO. In fact, if you're just using body-parser, it must be the defaults value of x-www-form-urlencoded. Otherwise you'll need the multer package.

### Do I need to use public.green_user or will just green_user work, when adding a new user to green_user? 
NO. At least in getUserProfile, it works either way.

### When I add the SQL query to pool.query(), does it have to end in a semicolon? 
NO. It seems to work either way.

### In db.query can I deconstruct ...req.body rather than listing all of the form fields?
???

### Is it only a SELECT query that produces a results object with rows?
NO. INSERT has a result with rows as well, it's just that it's empty.

### Why do I seem to be required to grant all privileges to PUBLIC for both sequences and both tables?
//! ???