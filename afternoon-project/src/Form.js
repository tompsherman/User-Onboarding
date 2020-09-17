import React, {useState} from "react"
import cuid from "cuid"
import * as yup from "yup"
import schema from "./formSchema"
import axios from "axios"


function Form(props){
    const {
        values,
        submit,
        change,
        errors
    } = props

const onSubmit = ((event)=>{
    event.preventDefault();
    submit()

})

const onChange = ((event)=>{
    const { name, value, type, checked} = event.target
    const valueToUse = type === "checkbox" ? checked : value
    change(name, valueToUse)
})


    return (
    <>
    <form onSubmit={onSubmit}>
    <div>    
    <h1>New user form</h1>
    <button>submit</button>
        <div className="errors">
            <div>{errors.name}</div>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
            <div>{errors.termsOfService}</div>
        </div>
    </div>
        <input 
            name="name"
            type="text"
            value={values.name}
            onChange={onChange}
            placeholder="enter name"
        />
        <input 
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            placeholder="enter email"
        />
        <input 
            name="password"
            type="text"
            value={values.password}
            onChange={onChange}
            placeholder="enter password"
        />
        <label> terms of service:
            <input 
                name="termsOfService"
                type="checkbox"
                checked={values.termsOfService}
                onChange={onChange}
                
            />
        </label>
       
    </form>
    </>
    )
}

export default Form