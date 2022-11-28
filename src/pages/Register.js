import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styling/login.css';

const Register = () => {

    const navigate = useNavigate();
    const [register, setRegister] = useState({
        email: "",
        username: "",
        password: ""
    })

    const handleInput = (e) => {
        setRegister({...register, [e.target.name]: e.target.value})
        console.log(register);
    }

    const handleRegister = (e) => {
        e.preventDefault()
        axios.post("http://94.74.86.174:8080/api/register", register)
        .then(res => {
            const data = res.data;
            alert(data.message)
        })
        .catch(err => {
            alert(err.errorMessage)
        })
    }

    const goLogin = () => {
        navigate('/')
    }

  return (
    <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="string" name='email' placeholder="Enter email"
                onChange={(e) => handleInput(e)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="string" name='username' placeholder="Enter username" onChange={(e) => handleInput(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password"
                onChange={(e) => handleInput(e)}  />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => handleRegister(e)}>
                Register
            </Button>
        </Form>
        <div>Back to <span className='reg-button' onClick={() => goLogin()}>Login page</span></div>
    </div>
  )
}

export default Register