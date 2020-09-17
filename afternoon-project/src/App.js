import React, { useState } from "react";
import cuid from "cuid";
import "./App.css";
import Form from "./Form";
import User from "./User";
import * as yup from "yup";
import schema from "./formSchema.js";
import axios from "axios";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  termsOfService: false,
};

const initialFormErrors = {
  name: "",
  password: "",
};

const initialUsers = [];

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

 const postNewUser = newUser => {axios
 .post("https://reqres.in/api/users")
 .then(response => {
   console.log(response)
   console.log(response.data)
   setUsers([...users, response.data])
   console.log(users)
   setFormValues(initialFormValues)
 })
 .catch(err=>{
   console.log("AXIOS POST ERROR!!!")
 })
 }
  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  };

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      termsOfService: formValues.termsOfService,
    };
    setUsers([...users, newUser]);
    setFormValues(initialFormValues);
  };

  return (
    <div className="App">
      
      <Form 
        values={formValues} 
        change={inputChange} submit={formSubmit}
        errors={formErrors} />
      {users.map((details) => {
        return <User key={cuid()} details={details} />;
      })}
    </div>
  );
}

export default App;
