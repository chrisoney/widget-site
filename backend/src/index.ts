import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hey there')
})


const port = 8080;
app.listen(port, () => { console.log(`Coming to you LIVE on port ${port}!`)});