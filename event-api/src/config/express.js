import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routesV1 from '../api/routes/v1/index';
import errorHandler from '../api/middlewares/error.middleware';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors());

// v1 routes
app.use(routesV1);

// error handling
app.use(errorHandler);

export default app;
