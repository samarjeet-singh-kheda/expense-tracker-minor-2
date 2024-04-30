/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_PG_DB_URL,
  },
};
