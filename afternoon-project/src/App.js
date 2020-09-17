import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "./Form"
import User from "./User"
import * as yup from "yup"
import schema from "./formSchema"
import axios from "axios"

const initialFormValues = ({
  name: "",
  email: "",
  password: "",
  termsOfService: false
})

const initialUsers = []

function App() {
  const [users, setUsers] = useState(initialUsers)
const [formValues, setFormValues] = useState(initialFormValues)

const inputChange = ((name, value)=>{
  setFormValues({
    ...formValues, [name]: value
  })
})

const formSubmit = (()=>{
  const newUser = {
    name: formValues.name.trim(),
    email: formValues.email.trim(),
    password: formValues.password.trim(),
    termsOfService: formValues.termsOfService
  }
  setUsers([...users, newUser])
  setFormValues(initialFormValues)
})

  return (
    <div className="App">
      <h1>New user form</h1>
      <Form 
       values={formValues}
       change={inputChange}
       submit={formSubmit}
      />
      {
        users.map((details) => {
          return (
            <User details = {details}/>
          )
        })
      }
    </div>
  );
}

export default App;
