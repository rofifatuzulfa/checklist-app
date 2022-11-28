import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import '../styling/login.css';

const Login = () => {

    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies();
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleInput = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post("http://94.74.86.174:8080/api/login", user)
            .then(res => {
                const data = res.data;
                setCookie("token", data.data.token);
                navigate('/home')
            })
    }

    const goRegister = () => {
        navigate('/register')
    }

  return (
    <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="string" name='username' placeholder="Enter username" onChange={(e) => handleInput(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" onChange={(e) => handleInput(e)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => handleLogin(e)}>
                Login
            </Button>
        </Form>
        <div>Don't have an account? <span className='reg-button' onClick={() => goRegister()}>Register now!</span></div>
    </div>
  )
}

export default Login