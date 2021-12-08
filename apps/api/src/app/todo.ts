import * as express from 'express';
import { Db, State } from '@cy-demo/api-interfaces';

const router = express.Router();

const db = {
  documents: [
    {id: 1, title: 'Do me first', description: 'Coffee though.', state: State.PENDING}
  ]
} as Db;

router.get('/', (req, res) => {
  res.json(db.documents);
});

router.get('/seed', (req, res) => {
  db.documents = [{id: 1, title: 'Do me first', description: 'Coffee though.', state: State.PENDING}];
  res.json(db.documents);
})

router.post('/', (req, res) => {
  const json = req.body;
  const nextId = db.documents.length > 0 ? (Math.max(...db.documents.map(d => d.id)) ?? 0) + 1 : 1;
  db.documents.push({...json, id: nextId});
  res.json(db.documents);
});

router.put('/:id', (req, res) => {
  const json = req.body;
  const todo = db.documents.find(d => d.id === Number(req.params.id));
  const index = db.documents.indexOf(todo);
  db.documents[index] = json;
  res.json(db.documents);
});

router.delete('/:id', (req, res) => {
  const todo = db.documents.find(d => d.id === Number(req.params.id));
  const index = db.documents.indexOf(todo);
  db.documents.splice(index, 1);
  res.json(db.documents);
});

router.get('/:id', (req, res) => {
  const doc = db.documents.find(d => d.id === Number(req.params.id));
  if (doc) {
    res.json(doc);
  } else {
    res.status(404);
    res.json({
      code: 404,
      error: 'Not found'
    })
  }
})


export default router;
