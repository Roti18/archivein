// LOCAL
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const dbUrl = process.env.DATABASE_URL || 'file:development.db';
export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		// authToken: process.env.DATABASE_AUTH_TOKEN,
		url: dbUrl
	},
	verbose: true,
	strict: true
});

// PRODUCTION
// import { defineConfig } from 'drizzle-kit';
// import * as dotenv from 'dotenv';
// dotenv.config();

// const dbUrl = process.env.DATABASE_URL;
// const authToken = process.env.DATABASE_AUTH_TOKEN;

// if (!dbUrl) {
//     throw new Error('DATABASE_URL is not set in environment variables.');
// }

// export default defineConfig({
//     schema: './src/lib/server/db/schema.ts',
//     dialect: 'sqlite',
//     dbCredentials: {
//         authToken: authToken,
//         url: dbUrl
//     },
//     verbose: true,
//     strict: true
// });
