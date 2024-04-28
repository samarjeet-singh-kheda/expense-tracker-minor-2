import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(
  "postgresql://Expenses-Tracker_owner:SzCdQbivLA38@ep-delicate-mud-a5oh3qgt.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require"
);
const db = drizzle(sql, { schema });
