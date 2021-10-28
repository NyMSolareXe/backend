export const Create = `
  CREATE TABLE users (
    id integer AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    active TINYINT(1)
  );
`

export const Drop = `
  DROP TABLE IF EXISTS users;
`

export const Seed = `
  INSERT INTO users VALUES 
  (DEFAULT, "Megatron", "Megatron@gmail.com", "Cybertron", "1"),
  (DEFAULT, "Optimus", "Optimus@gmail.com", "Hotrod", "1"),
  (DEFAULT, "Lanister", "JamieLanister@gmail.com", "Cersei", "1"),
  (DEFAULT, "Honeywell", "Honeywell123@gmail.com", "Amazonia", "1")
  ;
`

export default { Create, Drop, Seed }
