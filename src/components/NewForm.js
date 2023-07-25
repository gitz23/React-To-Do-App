import React, { useState } from 'react'

function NewForm() {


const [formData, setFormData] = useState({
    username: "",
    firstname : "",
    isactive : false
})


function handleOnchange(e){
    const names = e.target.name
    let value = e.target.value
    console.log(names)
    console.log(value)
    if(e.target.type === "checkbox"){
        value = e.target.checked
    }

    setFormData({...formData, [names]: value})

}

function handleSubmit(e){
    e.preventDefault()
    console.log(formData)
}




  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name='username'value={formData.username} placeholder='username' onChange={handleOnchange}/>
        <input type="text" name='firstname' value={formData.firstname} placeholder='firstname' onChange={handleOnchange}/>
        <input type="checkbox" name='isactive' value={formData.isactive} placeholder='Male' onChange = {handleOnchange}/>
        <input type="submit" value="Submit"/>
    </form>
  )
}

export default NewForm