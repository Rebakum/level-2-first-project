import mongoose from 'mongoose';

import { ServerConfig } from '../config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    app.listen(ServerConfig.port, () => {
      console.log(`Example app listening on port ${ServerConfig.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
