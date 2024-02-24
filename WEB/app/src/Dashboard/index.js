import React from 'react';
import { useLocalState } from '../utils/usingLocalStorage';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ajax from '../Services/fetchService';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';

const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);


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
        <div style={{ margin: "2em" }}>
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
            <div className='mb-5'><Button size='lg' onClick={() => createassignment()}>Submit new Assignment</Button></div>

            {assignments ? (
                <div className='d-grid  gap-5' style={{ gridTemplateColumns: "repeat(auto-fit,18rem)" }}>
                    {assignments.map((assignment) => (


                        <Card key={assignment.id} style={{ width: '18rem', height: '18rem' }}>
                            <Card.Body className="d-flex flex-column justify-content-around" >
                                <Card.Title>Assignment # :{assignment.number}</Card.Title>
                                <div className=' d-flex align-items-start'>
                                    <Badge pill bg= {assignment.status ==="Completed"?"success":"info"} style={{ fontSize: '1em', }}>
                                    {assignment.status}
                                </Badge>
                                </div>
                                
                                <Card.Text style={{ marginTop: '1em' }} >
                                    <p> <b>GitHub: </b> {assignment.githubUrl}</p>
                                    <p><b>Branch: </b> {assignment.branch}</p>
                                </Card.Text>
                                <Button variant="secondary" onClick={() => { window.location.href = `/assignment/${assignment.id}` }}>Edit </Button>
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
    );
};

export default Dashboard;