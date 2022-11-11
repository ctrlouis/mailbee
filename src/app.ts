import express from 'express';
import { Request, Response } from 'express';
import { SendForm } from './controllers/FormsToMail';

const app = express();
const router = express.Router();
app.use(express.json());

router.get('/', (req: Request, res: Response) => {
    res.send("Welcome to mail bee! 🐝");
});

router.post('/form/:formKey', SendForm);

app.use('/api/v1', router);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Application started on port ${port}!`);
});
