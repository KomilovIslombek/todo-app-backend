import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1', '1.0.0.1', '8.8.8.8']); // works around this network's broken SRV lookup
// console.log('dns', dns);

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`💾 Database aggressively connected to: ${conn.connection.host}`);
  } catch (error) {
    console.error(`💥 Database connection error: ${error.message}`);
    process.exit(1); // Crash the process immediately if the database is missing
  }
};
