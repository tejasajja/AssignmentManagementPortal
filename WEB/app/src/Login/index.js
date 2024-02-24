import React, { useState } from 'react';
import { useLocalState } from '../utils/usingLocalStorage';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    


    
    const[jwt, setJwt]= useLocalState("","jwt");

    console.log(username);

    function sendLoginReq(){
      const reqBody = {
        username : username, 
        password : password
      }
      console.log(reqBody);
    
      fetch ("auth/login",{
        headers: {
          "Content-Type": "application/json",
        },
          method :"post",
          body: JSON.stringify(reqBody)
    
      }).then((response)=> {
        if (response.status===200 )
            return Promise.all([response.json(),response.headers]);
        else return Promise.reject("Invalid Login attemp");
    })
      .then(([body,headers])=>{
        setJwt(headers.get("authorization"));
        window.location.href="dashboard";
        console.log("done");
      })
      .catch((message)=>{
        alert(message);
      })

    }
    return (
        <>
        <Container className='mt-5'>
        <Row className='justify-content-center'>
          <Col md='8' lg="6">

        
          <Form.Group className="mb-3" >

            <Form.Label className="fs-4">Username</Form.Label>
            <Form.Control type ='email' id='username'   placeholder= "Type username" value={username}  onChange={(event)=>setUsername(event.target.value)}/>
            </Form.Group>
            </Col> 
          </Row >
            <Row className='justify-content-center'><Col md='8' lg="6">
            <Form.Group className="mb-3" >
            <Form.Label className="fs-4">Password</Form.Label>
            <Form.Control type ='password' id='password' placeholder= "Type Password "value={password} onChange={(event)=>setPassword(event.target.value)} />

        </Form.Group>

        <Row className="justify-content-center">
          <Col
            md="8"
            lg="6"
            className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"
          ><div><Button id='submit' size='lg' type='button' onClick={() => sendLoginReq()}>Login</Button> <Button
              variant="secondary"
              type="button"
              size="lg"
              onClick={() => {
               window.location.href = "/";
              }}
            >
              Exit
            </Button> </div></Col></Row>
        </Col> 
          </Row >
        </Container>
        </>
        
    );
};

export default Login;