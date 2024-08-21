import cluster from 'cluster';
import customExpress from './config/CustomExpress';

const app = customExpress();

const numWorkers = 1;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('listening', function(worker){
		console.log('cluster connected: '+worker.process.pid);
	});

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    
    console.log(`Server is running on port ${port}`);
  });

}
