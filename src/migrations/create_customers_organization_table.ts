export const Create = `
  CREATE TABLE customer_organization (
    customer_id integer,
    organization_id integer
  );
`

export const Drop = `
  DROP TABLE IF EXISTS customer_organization;
`

export const Seed = `
  INSERT INTO customer_organization VALUES 
  (1, 1),
  (2, 1),
  (3, 2),
  (4, 2),
  (5, 3),
  (6, 3),
  (7, 4),
  (8, 4)
  ;
`

export default { Create, Drop, Seed }
