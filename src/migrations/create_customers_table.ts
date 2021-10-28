export const Create = `
  CREATE TABLE customer (
    id integer AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255)
  );
`

export const Drop = `
  DROP TABLE IF EXISTS customer;
`

export const Seed = `
  INSERT INTO customer VALUES 
  (DEFAULT, "Kazi", "Edmonton"),
  (DEFAULT, "David", "Alaska"),
  (DEFAULT, "Michael", "Montreal"),
  (DEFAULT, "Billy", "Toronto"),
  (DEFAULT, "John", "Vancouver"),
  (DEFAULT, "Tom", "California"),
  (DEFAULT, "Dao", "Seoul"),
  (DEFAULT, "Benoit", "Tokyo")
  ;
`

export default { Create, Drop, Seed }
