import React, { ChangeEvent, useEffect, useState } from 'react';
import { State, Todo } from '@cy-demo/api-interfaces';
import styled from 'styled-components';

const Flex = styled.div`
display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 200px 100px;
`;

const Label = styled.label`
display: flex;
  justify-content: space-between;
  width: 300px;
`;

export const App = () => {
  const [m, setTodos] = useState<Array<Todo>>([]);
  const [todo, setTodo] = useState<Todo>({state: State.PENDING, description: '', title: ''});

  useEffect(() => {
    fetch('/api/todo')
      .then((r) => r.json())
      .then(setTodos);
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!todo.id ) {
      const todos = await fetch(`/api/todo`, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await todos.json();
      setTodos(json);
      setTodo({state: State.PENDING, description: '', title: ''});
    } else {
      const todos = await fetch(`/api/todo/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await todos.json();
      setTodos(json);
      setTodo({state: State.PENDING, description: '', title: ''});
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const t = event.target as HTMLInputElement | HTMLSelectElement;
    const name = t.name;
    let value: string | number;
    if (name === 'state' || name === 'id') {
      value = Number(t.value);
    } else {
      value = t.value;
    }
    setTodo({...todo, [name]: value});
  }

  const edit = (todo: Todo) => {
    setTodo(todo);
  }

  const remove = async (todo: Todo) => {
    if (!todo.id) {
      setTodo({state: State.PENDING, description: '', title: ''});
      return;
    }
    const todos = await fetch(`/api/todo/${todo.id}`, {
      method: 'DELETE',
    });
    const json = await todos.json();
    setTodos(json);
    setTodo({state: State.PENDING, description: '', title: ''});
  }

  return (
    <>
      <Flex>
        <form onSubmit={handleSubmit} data-testid="form-something-name">
          <h5>Add</h5>
          <input type="hidden" name="id" value={todo.id} />
          <Label>
            Title
            <input type="text" name="title" value={todo.title} onChange={e => onChange(e)} />
          </Label><br />
          <Label>
            Description
            <input type="text" name="description"value={todo.description} onChange={e => onChange(e)} />
          </Label><br />
          <Label>
            State
            <select name="state"  value={todo.state} onChange={e => onChange(e)}>
              <option value={0}>Pending</option>
              <option value={1}>Done</option>
            </select>
          </Label><br />
          <button type="submit">Save</button>
          <button type="button" onClick={() => remove(todo)}>Delete</button>
        </form>
          <ul>
            {m.map(todo => <li className={todo.state === State.DONE ? 'done' : 'pending'} style={{ color: todo.state === State.DONE ? '#008000' : '#000000' }} key={todo.id} onClick={() => edit(todo)}>{todo.title}</li>)}
          </ul>
        <br />
      </Flex>
    </>
  );
};

export default App;
