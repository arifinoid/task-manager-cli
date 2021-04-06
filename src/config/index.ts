const name = process.env.NAME;

interface IDBAuth {
  username: string;
  password: string;
}

export interface ICouchDB {
  auth: IDBAuth;
}

export default {
  name,
  couchDBUrl: process.env.DB_URL || "localhost",
  couchDBAuth: {
    username: process.env.DB_USERNAME || "bukanadmin",
    password: process.env.DB_PASSWORD || "password",
  },
  version: '1.0.0',
};
