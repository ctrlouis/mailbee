import express from 'express';
import type { Request, Response } from 'express';
import morgan from 'morgan';
import { SendForm } from './controllers/FormsToMail';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const router = express.Router();
app.use(express.json());
app.use(morgan('dev'));

router.get('/', (req: Request, res: Response) => {
    res.send("Welcome to mail bee! 🐝");
});

router.post('/form/:formKey', SendForm);

app.use('/api/v1', router);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Application started on port ${port}! 🚀`);
});
