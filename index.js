const express = require('express')
const app = express()
const cors = require('cors')
let pool = require('./db')
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.post("/todos", async (req, res) => {
    try {
        const {describtion} = req.body;
        console.log(describtion)
        const newTodo = await pool.query(
        "INSERT INTO todo (describtion) VALUES($1) RETURNING * ", [describtion]);

        res.json(newTodo.rows[0])
        
    } 
    catch (e) {
        console.log(e)
    }
})

// get all todos

app.get('/todos', async (req, res) => {
    try {
       const allTodos = await pool.query("SELECT * FROM todo") 
       res.json(allTodos.rows)
    } 
    catch (error) {
        
    }
})

// get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])

        res.json(todo.rows)

    } catch (error) {
        
    }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {describtion} = req.body
        const updateTodo = await pool.query(
    "UPDATE todo SET describtion = $1 WHERE todo_id = $2", [describtion, id])

    res.json("todo was updated")

    } catch (error) {
        
    }
})


// delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])

        res.json("todo was deleted")

    } catch (error) {
        
    }
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})