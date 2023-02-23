import express, { Express} from 'express';
import mongoose from 'mongoose';
import { KafkaConsumer } from './kafka/consumer';
import { userRoute } from './routes/user.route';
import { projectRoute } from './routes/project.route';

const port: number = 3001
const app: Express = express();
try {
  mongoose.set('strictQuery', false)
  mongoose.connect('mongodb://mongodb:27017');
} catch (e) {
  console.error(e);
}

const kafka = new KafkaConsumer
kafka.start()

userRoute(app)
projectRoute(app)


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});