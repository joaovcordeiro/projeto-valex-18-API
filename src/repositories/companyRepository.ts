import { connection } from "../config/database.js";

export interface Company {
  id: number;
  name: string;
  apiKey?: string;
}

export async function findByApiKey(apiKey) {
  const result = await connection.query<Company, [string]>(
    `SELECT * FROM companies WHERE "apiKey"=$1`,
    [apiKey]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}
