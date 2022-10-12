-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR
);

CREATE TABLE todos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  qty BIGINT,
  todo TEXT,
  location TEXT,
  completed BOOLEAN NOT NULL DEFAULT(FALSE),
  description VARCHAR,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT into users (first_name, last_name, email, password_hash) values 
('Bruce','Wayne','imbatman@brucewayne.com','caving'),
('Dick','Grayson','sodekick@brucewayne.com','circusboy'),
('Selina','Kyle','meowbitch@leather.com','ilovecats'),
('Harley','Quinn','ilovejoker@crazytrain.com','jokerjoker');

INSERT into todos (user_id, qty, location, todo, description, completed) values
('1', '1', 'police station','Interigate Penguin','DID HE KILL MY PARENTS?!?!?!?!?!','false'),
('2','1','batcave','clean batcave','Clean up bat poop from ALL the stuff they poop on','false'),
('3','1','home','feed cats','Make sure my sweeties are nice and fed','false'),
('4','1','office','help Riddler','Find out what he did *FOR JOKER*','false'),
('1','1','arkam asylum','drop off Riddler','Leave Riddler for the damage he caused','false'),
('2','1','batcave','clean vehicles','Need to get all the junkfood and blood from inside the vehicle, and spray off the outside','false'),
('3','1','jewlrey store','steal jewlrey','need new jewley to match my babies collars','false'),
('4','1','office','help Scarecrow','find out what Scarecrow keeps his gas *FOR JOKER*','false'),
('1','1','bruce manor','do Bruce Wanye things','sign paperwork, send emails, kiss babies','false'),
('2','1','batcave','feed bats','bats gotta eat','false'),
('3','1','jewlrey store','steal gems','need gems for new kitty collars','false'),
('4','1','arkam asylum','set JOKER free','break out JOKER after I get all the info he needs!','false')

