import express from 'express';
import type { Request, Response } from 'express';
import morgan from 'morgan';
import createApiQuota from './controllers/apiQuota';
import { SendForm } from './controllers/FormsToMail';
import { prometheusRouter } from './controllers/Prometheus';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const router = express.Router();
const apiQuota = createApiQuota();

app.use(express.json());
app.use(morgan('dev'));
app.use(prometheusRouter);

router.get('/', (req: Request, res: Response) => {
    res.send("Welcome to mail bee! 🐝");
});

router.post('/form/:formKey', apiQuota, SendForm);

app.use('/api/v1', router);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Application started on port ${port}! 🚀`);
});
