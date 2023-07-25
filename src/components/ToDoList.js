import React, {useEffect, useState} from 'react'
import uuid from 'react-uuid';
import Swal from "sweetalert2"; 
import '../App.css';
import EditTodoForm from './EditTodoForm';
import Form from './Form';
import Todo from './Todo';



const ToDoList = () => {

  //sets state for the todos
  const [todos, setTodos] = useState([]);
 
  //performs a GET request
  //and updates teh todos with the setTodos function
  useEffect(() => {
    fetch("http://localhost:4000/todos")
  .then(r => r.json())
  .then(todos => setTodos(todos))
  }, []);
 
  //function that performs DELETE
  //it is passed in as a prop to the Todo component
  //takes in a param of task 
  //in the DELETE request it takes in task.id to delete the specific task
  //calls in sweet alert to inform the user that the delete has been performed succesfully
  function handleDelete(task){
    fetch(`http://localhost:4000/todos/${task.id}`, {
      method: "DELETE",
      headers : {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(r => r.json())
    .then(()=> {
      Swal.fire({  
        title: 'Success',  
        type: 'success',  
        text: `${task.task} deleted successfully.`,  
      }); 
      //takes in the state todo array and returns all that haven't been deleted
      //this is done through filter
      const filteredItems = todos.filter((todo) => todo.id !== task.id )
      setTodos(filteredItems)
    })
  };

  function addToDo(todo){
    fetch("http://localhost:4000/todos",{
      method : "POST",
      headers : {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body : JSON.stringify({
        id :uuid(),
        task : todo,
        isTrue: false
      })
    })
    .then(r => r.json())
    .then(data => {
      Swal.fire({  
        title: 'Success',  
        type: 'success',  
        text: 'Task added successfully.',  
      }); 
      setTodos(prev => [...prev, data])
    })

  }

  function editTodo(id){
      setTodos(todos.map(todo => todo.id === id ? {...todo, isTrue: !todo.isTrue} : todo))
  }
  
  function editTask(task, todo){
    fetch(`http://localhost:4000/todos/${todo.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        task : task,
        isTrue: !todo.isTrue
      })
    })
    .then(r => r.json())
    .then(data => {
      Swal.fire({  
        title: 'Success',  
        type: 'success',  
        text: 'Task updated successfully.',  
      });
      setTodos(todos.map(todo => todo.id === data.id ? data: todo))
    })
  
  }

    const displayItems = todos.map((todo) => {

    return (todo.isTrue ? 
      (<EditTodoForm 
        key={todo.id} 
        todo ={todo} 
        editTodo={editTask} 
        />) 
      : (<Todo 
        key={todo.id} 
        todo={todo} 
        editTodo={editTodo} 
        handleDelete = {handleDelete}
        />
        ))
      
        
    })

    console.log(todos)

    return (
      <div  className='Todolist'>

        <Form  addToDo={addToDo} />
        {displayItems}
      </div>
    )
}

export default ToDoList