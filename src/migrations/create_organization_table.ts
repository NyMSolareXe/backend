export const Create = `
  CREATE TABLE organization (
    id integer AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(15)
  );
`

export const Drop = `
  DROP TABLE IF EXISTS organization;
`

export const Seed = `
  INSERT INTO organization VALUES 
  (DEFAULT, "Avanti", "7379 Boulevard Sunshine", "637 442 1312"),
  (DEFAULT, "Microsoft", "222 West Minister", "812 417 3565"),
  (DEFAULT, "Amazon", "3459 Saga Road", "431 643 7452"),
  (DEFAULT, "Google", "6511 Candy Land", "134 753 9042")
  ;
`

export default { Create, Drop, Seed }
