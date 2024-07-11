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
  }
});

app.listen(3000, () => console.log(" ✅ Listening to 3000 "));
