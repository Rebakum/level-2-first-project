import 'dotenv/config';

// dotenv.config({
//   path: path.join((process.cwd(), '.env')),
// });

export const ServerConfig = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
