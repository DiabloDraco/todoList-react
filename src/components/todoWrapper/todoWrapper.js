import './todoWrapper.scss'

function TodoWrapper({ children }) {


    return (
        <ul id="list">
            {children}
        </ul>
    )
}

export default TodoWrapper