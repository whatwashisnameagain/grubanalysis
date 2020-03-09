-- CREATE TABLES 
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    category TEXT
);

CREATE TABLE reviewers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    karma INTEGER check (karma <= 7 and karma >=0)
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    reviewer_id INTEGER REFERENCES reviewers(id),
    stars INTEGER CHECK (stars >= 0 and stars <= 5),
    title TEXT,
    review TEXT,
    restaurant_id INTEGER REFERENCES restaurants(id)
);

-- STARTER DATA 
