import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import chalk from 'chalk';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    chalk.blue(
      `🚀 Server is aggressively running in ${chalk.red(process.env.NODE_ENV)} mode on port ${chalk.redBright(PORT)}`
    )
  );
});

process.on('unhandledRejection', err => {
  console.error('💥 UNHANDLED REJECTION! Shutting down gracefully...');
  console.error(err.name, err.message);

  // Close server first, then exit the application process cleanly
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', err => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down instantly...');
  console.error(err.name, err.message);
  process.exit(1);
});
