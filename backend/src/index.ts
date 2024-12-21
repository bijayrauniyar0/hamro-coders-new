import express from 'express';

const app = express();
const port = 9000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Nodemon!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
