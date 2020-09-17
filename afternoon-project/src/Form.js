import React, {useState} from "react"
import cuid from "cuid"
import * as yup from "yup"
import schema from "./formSchema"
import axios from "axios"

const initialFormValues = ({
    name: "",
    email: "",
    password: "",
    termsOfService: false
})

const initialFormErrors = {
    username: '',
    email: '',
    role: '',
    civil: '',
  }

function Form(){

const [users, setUsers] = useState([])
const [formValues, setFormValues] = useState(initialFormValues)
const [formErrors, setFormErrors] = useState(initialFormErrors) // object


const onChange = ((event) => {
    const {name, value, type, checked} = event.target
    const valueToUse = type === "checkbox" ? checked : value
    setFormValues({...formValues, [name]: valueToUse})
})

const onSubmit = ((event)=>{
    event.preventDefault();
    const newUser = {
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password.trim(),
        termsOfService: formValues.termsOfService
    }
    setUsers([...users, newUser])
    setFormValues(initialFormValues)
})

const validate = (name, value) => {
    // let's validate this specific key/value
    // yup.reach will allow us to "reach" into the schema and test only one part.
    // We give reach the schema as the first argument, and the key we want to test as the second.
    yup
      .reach(schema, name)
      // we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => { // eslint-disable-line
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }
  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

    return (
    <>
    <div>
        Hello worlds
        <div className='errors'>
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{formErrors.name}</div>
          <div>{formErrors.email}</div>
          <div>{formErrors.password}</div>
        </div>
    {
        users.map((user)=>{
           return (
            <div key={cuid()}>  
               <p>name: {user.name}</p>
               <p>email: {user.email}</p>
               <p>password: {user.password}</p>
               <br></br>
            </div>
 
            )
        })
    }
    <form onSubmit={onSubmit}>
        <input 
            name="name"
            type="text"
            value={users.name}
            onChange={onChange}
            placeholder="enter name"
        />
        <input 
            name="email"
            type="email"
            value={users.email}
            onChange={onChange}
            placeholder="enter email"
        />
        <input 
            name="password"
            type="text"
            value={users.password}
            onChange={onChange}
            placeholder="enter password"
        />
        <input 
            name="termsOfService"
            type="checkbox"
            checked={users.termsOfService}
            onChange={onChange}
        />
        <button>submit</button>
    </form>
    
    </div>
    </>
    )
}

export default Form