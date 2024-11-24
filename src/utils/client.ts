import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USER,
} from "@/config/constants";
import * as mysql from "mysql";
import * as util from "util";

export const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  multipleStatements: true,
});

connection.connect();

export const query = util.promisify(connection.query).bind(connection);
