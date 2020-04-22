DROP TABLE IF EXISTS green_thing;
CREATE TABLE IF NOT EXISTS green_thing(
    thing_id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES green_user(green_user_id),
    thing_name VARCHAR(255) NOT NULL,
    thing_desc TEXT NOT NULL,
    created_on TIMESTAMP NOT NULL,
	last_update TIMESTAMP default current_timestamp
);