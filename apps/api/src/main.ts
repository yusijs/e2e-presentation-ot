import * as express from 'express';
import * as bodyParser from 'body-parser';
import todo from './app/todo'


const app = express();
app.use(function log(req, res, next) {
  console.log(`Request ${req.path} ${req.method} at`, Date.now());
  next();
} );
app.use(bodyParser.json())
app.use('/api/todo', todo);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
