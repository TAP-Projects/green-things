DROP TABLE IF EXISTS green_user;
CREATE TABLE IF NOT EXISTS green_user(
    green_user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    created_on TIMESTAMP NOT NULL,
	last_login TIMESTAMP default current_timestamp
);