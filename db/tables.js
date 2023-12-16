/************************************************
TABLE DEFINITIONS - FOR REFERENCE ONLY
*************************************************

CREATE TABLE users(
	id VARCHAR(36) NOT NULL PRIMARY KEY,
	username VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE notes(
	id VARCHAR(36) NOT NULL PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    color VARCHAR(7) DEFAULT '#000000',
    updated_at DATETIME,
    user_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

*************************************************/
