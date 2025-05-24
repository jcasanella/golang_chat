ALTER TABLE users
ADD CONSTRAINT unique_users_username UNIQUE (username);