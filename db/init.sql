CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(200) NOT NULL,
    profile_pic VARCHAR(2000) NOT NULL,
    region VARCHAR(8) NOT NULL,
    register_date DATE DEFAULT CURRENT_DATE,
    birthday DATE,
    island VARCHAR(10),
    fruit INT,
    comment VARCHAR(24)
);

CREATE TABLE museum (
    museum_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE bugs (
    bugs_table_id SERIAL PRIMARY KEY,
    bug_id INT NOT NULL,
    museum_id INT REFERENCES museum(museum_id) ON DELETE CASCADE
);

CREATE TABLE fish (
    fish_table_id SERIAL PRIMARY KEY,
    fish_id INT NOT NULL,
    museum_id INT REFERENCES museum(museum_id) ON DELETE CASCADE
);

CREATE TABLE sea (
    sea_table_id SERIAL PRIMARY KEY,
    sea_creature_id INT NOT NULL,
    museum_id INT REFERENCES museum(museum_id) ON DELETE CASCADE
);