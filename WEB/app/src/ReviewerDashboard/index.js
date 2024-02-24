import React from 'react';
import { useLocalState } from '../utils/usingLocalStorage';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ajax from '../Services/fetchService';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const ReviewerDashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);

    function leaveFeedback(assignment){
        window.location.href = `/assignment/${assignment.id}`
    }

    function claimAssignment(assignment){
        const decodedJwt= jwtDecode(jwt);
        const user = {
            name: decodedJwt.sub,
            authorities: decodedJwt.authorities,
        }

        assignment.codeReviewer=user
        assignment.status="In Review"

        console.log(user);

        ajax(`auth/assignment/${assignment.id}`, "PUT", jwt, assignment).then((updatedAssignment)=>{
        const assignmentsCopy = [...assignments];
        const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
        assignmentsCopy[i] = updatedAssignment;
        setAssignments(assignmentsCopy);
        console.log(user)
        })
    
    }
    useEffect(() => {
        ajax(`auth/assignment`, "GET", jwt)
            .then((assignmentData) => {
                setAssignments(assignmentData);
            });
    }, [jwt]);

    function createassignment() {
        ajax(`auth/assignment`, "POST", jwt)
            .then((assignment) => {
                window.location.href = `/assignment/${assignment.id}`;
            });
    }

    return (
        <Container>
            <Row>
                <Col>
                <div className='d-flex justify-content-end'
                style={{cursor:"pointer"}}
                onClick={()=>{setJwt(null);
                window.location.href= "/login";
                }}>
                    Logout
                </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <h1>Reviewer Dashboard</h1>
                </Col>
            </Row>

            <div className='assignment-wrapper in-review'>
            <div className='assignment-wrapper-title h3 px-2'>In Rewiew </div>
            {assignments && assignments.filter((assignment)=> assignment.status === "Submitted").length> 0?( 
                <div className='d-grid  gap-5' style={{ gridTemplateColumns: "repeat(auto-fit,18rem)" }}>
                    
                    {assignments.filter(assignment=>assignment.status === 'In Review').map((assignment) => (

                        <Card key={assignment.id} style={{ width: '18rem', height: '18rem' }}>
                            <Card.Body className="d-flex flex-column justify-content-around" >
                                <Card.Title>Assignment # :{assignment.number}</Card.Title>
                                <div className=' d-flex align-items-start'>
                                <Badge pill bg= {assignment.status ==="Completed"?"success":"info"} style={{ fontSize: '1em', }}>
                                    {assignment.status}
                                </Badge>
                                </div>
                                
                                <Card.Text style={{ marginTop: '1em' }} >
                                    <p> <b>GitHub:</b> {assignment.githubUrl}</p>
                                    <p><b>Branch: </b> {assignment.branch}</p>
                                </Card.Text>
                                <Button variant="secondary" onClick={() => { leaveFeedback(assignment) }}>Give Feedback </Button>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                            </Card.Body>
                        </Card>
                        // <Link to= {`/assignment/${assignment.id}`}> Assignment ID: {assignment.id}
                        // </Link>

                    ))}
                </div>
            ) : (
                <></>
            )}
            </div>


            <div className='assignment-wrapper submitted'>
            <div className='assignment-wrapper-title h3 px-2'>Awaiting Rewiew </div>
            {assignments && assignments.filter((assignment)=> assignment.status === "Submitted").length> 0? ( 
                <div className='d-grid  gap-5' style={{ gridTemplateColumns: "repeat(auto-fit,18rem)" }}>
                    
                    {assignments.filter(assignment=>assignment.status === 'Submitted').map((assignment) => (

                        <Card key={assignment.id} style={{ width: '18rem', height: '18rem' }}>
                            <Card.Body className="d-flex flex-column justify-content-around" >
                                <Card.Title>Assignment # :{assignment.number}</Card.Title>
                                <div className=' d-flex align-items-start'>
                                    <Badge pill bg="info" style={{ fontSize: '1em', }}>
                                    {assignment.status}
                                </Badge>
                                </div>
                                
                                <Card.Text style={{ marginTop: '1em' }} >
                                    <p> <b>GitHub:</b> {assignment.githubUrl}</p>
                                    <p><b>Branch: </b> {assignment.branch}</p>
                                </Card.Text>
                                <Button variant="secondary" onClick={() => { claimAssignment(assignment) }}>Claim </Button>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                            </Card.Body>
                        </Card>
                        // <Link to= {`/assignment/${assignment.id}`}> Assignment ID: {assignment.id}
                        // </Link>

                    ))}
                </div>
            ) : (
                <></>
            )}
            </div>
            <div className='assignment-wrapper need-update'>
            <div className='assignment-wrapper-title h3 px-2'>Need-update </div>
            {assignments && assignments.filter((assignment)=> assignment.status === "NEED Update").length> 0? ( 
                <div className='d-grid  gap-5' style={{ gridTemplateColumns: "repeat(auto-fit,18rem)" }}>
                    
                    {assignments.filter(assignment=>assignment.status === 'NEED Update').map((assignment) => (

                        <Card key={assignment.id} style={{ width: '18rem', height: '18rem' }}>
                            <Card.Body className="d-flex flex-column justify-content-around" >
                                <Card.Title>Assignment # :{assignment.number}</Card.Title>
                                <div className=' d-flex align-items-start'>
                                    <Badge pill bg="info" style={{ fontSize: '1em', }}>
                                    {assignment.status}
                                </Badge>
                                </div>
                                
                                <Card.Text style={{ marginTop: '1em' }} >
                                    <p> <b>GitHub:</b> {assignment.githubUrl}</p>
                                    <p><b>Branch: </b> {assignment.branch}</p>
                                </Card.Text>
                                <Button variant="secondary" onClick={() => { window.location.href=`/assignment/${assignment.id}` }}>View </Button>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                            </Card.Body>
                        </Card>
                        // <Link to= {`/assignment/${assignment.id}`}> Assignment ID: {assignment.id}
                        // </Link>

                    ))}
                </div>
            ) : (
                <></>
            )}
            </div>
        </Container>
    );
};

export default ReviewerDashboard;