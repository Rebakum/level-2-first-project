import mongoose from 'mongoose';
import config from '../config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
