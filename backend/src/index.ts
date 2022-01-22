import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
const  { environment } = require('./config/index.js');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

const isProduction = environment === 'production';

if (isProduction) app.use(cors());

app.use(helmet({
  contentSecurityPolicy: false
}))

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "lax",
      httpOnly: true,
    }
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('Hey there')
})


const port = 8080;
app.listen(port, () => { console.log(`Coming to you LIVE on port ${port}!`)});