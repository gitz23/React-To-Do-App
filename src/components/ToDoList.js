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
  //and updates the todos with the setTodos function
  useEffect(() => {
    fetch("http://localhost:3000/todos")
  .then(r => r.json())
  .then(todos => setTodos(todos))
  }, []);
 
  //function that performs DELETE request
  //it is passed in as a prop to the Todo component
  //takes in a param of task 
  //in the DELETE request it takes in task.id to delete the specific task
  //calls in sweet alert to inform the user that the delete has been performed succesfully
  function handleDelete(task){
    fetch(`http://localhost:3000/todos/${task.id}`, {
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
      //set the new variable as the value of todos
      const filteredItems = todos.filter((todo) => todo.id !== task.id )
      setTodos(filteredItems)
    })
  };

  //function that performs POST request
  //it is passed in as a prop to the Form component
  function addToDo(todo){
    fetch("http://localhost:3000/todos", {
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
  };

  //function that edits the clicked todo
  //the id is passed in as an argument from the child 
  //if the todo.id matches the clicked id 
  //copy the old object and change the isTrue value
  function editTodo(id){
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isTrue: !todo.isTrue} : todo)))
  }
  

  //function that performs PATCH request
  //takes in task and todo as arguments passed from the child <EditToDoForm />
  //body contains the part that is getting changed
  //calls in sweet alert to inform the user that the patch has been performed succesfully
  function editTask(task, todo){
    fetch(`http://localhost:3000/todos/${todo.id}`, {
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
    .then((r) => r.json())
    .then(task => {
      Swal.fire({  
        title: 'Success',  
        type: 'success',  
        text: 'Task updated successfully.',  
      });
      //if the task.id passed in is === to data.id true pass in the data to the setTodos
      setTodos(todos.map((todo) => todo.id === task.id ? task : todo))
    })
  };

  const displayItems = todos.map((todo) => {
    //if value is true bring out the edit todo form if not bring out the todo
      return (todo.isTrue ? 
        (<EditTodoForm key={todo.id} todo={todo} editTask={editTask} />) : (<Todo key={todo.id} todo={todo} editTodo={editTodo} handleDelete={handleDelete}/>))    
      })

  console.log(todos)

  return (
    <div className='Todolist'>
      <Form addToDo={addToDo} />
      {displayItems}
    </div>
  )
}

export default ToDoList