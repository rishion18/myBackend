import cluster, { Worker } from 'cluster';
import os from 'os';
const numCPUs = os.cpus().length;
import dotenv from 'dotenv';
dotenv.config();
import startServer from './server.js';


if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  console.log(`Forking ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Optional: Log when a worker dies
  cluster.on('exit', (worker:Worker, code: number, signal: string) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Spawning a new worker...');
    cluster.fork();
  });

} else {
  import('./server.js').then(({ default: startServer }) => {
    startServer();
  }).catch(err => {
    console.error('Failed to start worker server:', err);
  });}
