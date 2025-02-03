import "dotenv/config";
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"
import { neon } from '@neondatabase/serverless';


export const sql = neon(process.env.DATABASE_URL as string) //*neon
const db = drizzle(sql, { schema, logger: true }) 

export default db


