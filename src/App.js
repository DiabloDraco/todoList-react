import TodoWrapper from './components/todoWrapper'
import TodoItem from './components/todoItem';
import { useState, useRef, useEffect } from "react"

function App() {
  let localTodos = JSON.parse(localStorage.getItem("todos"))
  let [todos, setTodos] = useState([])
  useEffect(() => {
    if (localTodos) {
      todos = localTodos
      setTodos(todos)
      document.querySelector("#total").textContent = localTodos.length
    }
  }, []);

  let inputRef = useRef(null)
  let formRef = useRef(null)
  function handleSubmit(evt) {
    evt.preventDefault()
    if (inputRef.current.value.length > 1) {
      let newTodo = {
        id: todos.length + 1,
        title: inputRef.current.value,
        check: false
      }
      setTodos([...todos, newTodo])
      formRef.current.reset()
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]))
    }
    document.querySelector("#total").textContent = todos.length + 1
  }
  function clear() {
    todos = []
    setTodos(todos)
    localStorage.setItem("todos", JSON.stringify(todos))
    document.querySelector("#total").textContent = 0
  }

  return (
    <>
      <form id="form" ref={formRef} onSubmit={handleSubmit}>
        <h1 id="error"></h1>
        <div id="wrapper">
          <div id="tot">
            <input id="input" ref={inputRef} type="text" placeholder="Please type something"
            />
            <button id="add">Add</button>
            <button onClick={clear} id="clear" type="button">Clear All</button>
          </div>
          <div id="tot-wrap">
            <p id="tot-text">Total:</p><span id="total">0</span>
          </div>
        </div>
      </form>
      <TodoWrapper>
        {
          todos.map(t => (
            <TodoItem
              title={t.title}
              id={t.id}
              key={t.id}
              allTodos={todos}
              setTodo={setTodos}
              check={t.check}
            />
          ))
        }
      </TodoWrapper>
    </>
  );
}

export default App;
