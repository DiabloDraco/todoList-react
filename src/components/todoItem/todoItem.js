import './todoItem.scss'

function todoItem({title , id , allTodos , setTodo , check}) {
    function todoDelete() {
        let filteredTodo = allTodos.filter(finddel => finddel.id !== id)
        
        setTodo(filteredTodo)
        localStorage.setItem("todos", JSON.stringify(filteredTodo))
    }

    function endedTodo(evt) {
        let needCheck = allTodos.find(finddel => finddel.id === id)
        let filteredTodo = allTodos.filter(finddel => finddel.id !== id)
        needCheck.check = evt.target.checked
        setTodo([...filteredTodo , needCheck].sort(function (a , b) {
            return a.id - b.id
        }))
        localStorage.setItem("todos", JSON.stringify([...filteredTodo , needCheck].sort(function (a , b) {
            return a.id - b.id
        })))

    }

    function todoEdit(evt) {
        let needEdit = allTodos.find(finddel => finddel.id === id)
        let filteredTodo = allTodos.filter(finddel => finddel.id !== id)
        needEdit.title = prompt()
        if (needEdit.title.length > 1) {
            setTodo([...filteredTodo , needEdit].sort(function (a , b) {
                return a.id - b.id
            }))
            localStorage.setItem("todos", JSON.stringify([...filteredTodo , needEdit].sort(function (a , b) {
                return a.id - b.id
            })))
        }
    }

    return (
        <li>
            <label className="form-control">
                <input defaultChecked={check} onClick={endedTodo} type="checkbox" name="checkbox" />
            </label>
            {
                check ? <del className='pii'>{title}</del>:<p className='pii'>{title}</p>
            }
            <button onClick={todoEdit} className="button1">Edit</button>
            <button onClick={todoDelete} className="button">Delete</button>
        </li>
    )
}

export default todoItem