/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgresql://Expenses-Tracker_owner:SzCdQbivLA38@ep-delicate-mud-a5oh3qgt.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require",
  },
};
