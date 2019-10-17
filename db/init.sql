CREATE TABLE rooms (
    id serial PRIMARY KEY,
    user1 INTEGER,
    user2 INTEGER,
    room_name TEXT
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    time_sent TIMESTAMPTZ,
    sender TEXT,
    recipient TEXT,
    room_name TEXT,
    message TEXT
);