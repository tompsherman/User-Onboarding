import React, {useState} from "react"
import cuid from "cuid"

const initialFormValues = ({
    name: "",
    email: "",
    password: "",
})

function Form(){

const [users, setUsers] = useState([])
const [formValues, setFormValues] = useState(initialFormValues)

const onChange = ((event) => {
    const {name, value} = event.target
    setFormValues({...formValues, [name]: value})
})

const onSubmit = ((event)=>{
    event.preventDefault();
    const newUser = {
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password.trim(),
    }
    setUsers([...users, newUser])
    setFormValues(initialFormValues)
})
    return (
    <>
    <div>
        Hello worlds
    
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
        <button>submit</button>
    </form>
    
    </div>
    </>
    )
}

export default Form