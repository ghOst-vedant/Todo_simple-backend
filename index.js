import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
let todos = [];
app.get("/todos", (req, res) => {
  res.json({ todos });
});

app.get(`/todos/:id`, (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).json({ Message: "Todo Not Found" });
  } else {
    res.status(200).json({ todo });
  }
});
app.post("/todos/", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.desc,
  };
  todos.push(newTodo);
  res.status(201).json({ "After adding newTodo": todos });
});
app.put(`/todos/:id`, (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) res.status(404).json("Todo Not Found.");
  else {
    todos[index].title = req.body.title;
    todos[index].description = req.body.desc;
    res.status(200).json(todos[index]);
  }
});
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
  if (todoIndex === -1) {
    res.status(404).json({ error: "Todo Not Found" });
  } else {
    todos.splice(todoIndex, 1);
    res.json({ "New Todo List": todos });
  }
});
app.listen(3000, () => console.log(" ✅ Listening to 3000 "));
