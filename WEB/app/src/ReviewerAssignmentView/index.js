

import React, { useEffect, useRef, useState } from 'react';
import { useLocalState } from '../utils/usingLocalStorage';
import { Link } from 'react-router-dom';
import ajax from '../Services/fetchService';
import { Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';

const ReviewerAssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignment/")[1]
    const [assignment, setAssignments] = useState({
        branch: "",
        githubUrl: "",
        number: null,
        status: null,

    });
    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatusEnums, setAssignmentStatusEnums] = useState([]);

    const prevAssignmentValue = useRef(assignment);

    function updateAssignment(prop, value) {
        const newAssignment = { ...assignment };
        newAssignment[prop] = value;
        console.log(newAssignment);
        setAssignments(newAssignment);
    }

    function save(status) {
        // this implies that the student is submitting the assignment for the first time

        if (status && assignment.status !== status ){
            updateAssignment("status", status);
        } else {
            persist();
        }
    }

    function persist() {
        ajax(`/auth/assignment/${assignmentId}`, "PUT", jwt, assignment).then(
            (assignmentData) => {
                setAssignments(assignmentData);
            }
        );
    }

    useEffect(() => {
        if (prevAssignmentValue.current.status !== assignment.status) {
            persist();
        }
        prevAssignmentValue.current = assignment;
    }, [assignment]);


    useEffect(() => {
        ajax(`/auth/assignment/${assignmentId}`, "GET", jwt)
            .then((assignmentResponse) => {
                let assignmentData = assignmentResponse.assignment;
                console.log(assignmentData);
                if (assignmentData.branch == null) assignmentData.branch = "";
                if (assignmentData.githubUrl == null) assignmentData.githubUrl = "";
                setAssignments(assignmentData);
                setAssignmentEnums(assignmentResponse.assignmentEnums);
                setAssignmentStatusEnums(assignmentResponse.statusEnums);
            });
    }, []);

    useEffect(() => {
        console.log(assignmentEnums);
    }, [assignmentEnums]);

    return (
        <div>
            <Container className='mt-5'>
                <Row className='d-flex align-items-center'>
                    <Col className='align-content-center'>
                        {assignment.number ? (<h1>Assignment {assignment.number}</h1>) : (<></>)}
                    </Col>
                    <Col className='align-content-center'>
                        <Badge pill bg="info" style={{ fontSize: '1em' }}>
                            {assignment.status}
                        </Badge>
                    </Col>
                </Row>


                {assignment ? (
                    <>

                        <Row className='justify-content-center'>
                            <Col md='8' lg="6">

                                <Form.Group className="mb-10" >

                                    <Form.Group as={Row} className="my-3" controlId="githubUrl">
                                        <Form.Label column sm="3" md="2">
                                            GitHub URL:
                                        </Form.Label>
                                        <Col sm="9" md="8" lg="6">
                                            <Form.Control
                                                onChange={(e) =>
                                                    updateAssignment("githubUrl", e.target.value)
                                                }
                                                readOnly
                                                type="url"
                                                value={assignment.githubUrl}
                                                placeholder="https://github.com/username/repo-name"
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="branch">
                                        <Form.Label column sm="3" md="2">
                                            Branch:
                                        </Form.Label>
                                        <Col sm="9" md="8" lg="6">
                                            <Form.Control
                                            readOnly
                                                type="text"
                                                placeholder="example_branch_name"
                                                onChange={(e) => updateAssignment("branch", e.target.value)}
                                                value={assignment.branch}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group as={Row} className="my-3" controlId="githubUrl">
                                        <Form.Label column sm="3" md="2">
                                            Video Review URL
                                        </Form.Label>
                                        <Col sm="9" md="8" lg="6">
                                            <Form.Control
                                                onChange={(e) =>
                                                    updateAssignment("codeReviewVideoUrl", e.target.value)
                                                }
                                                type="url"
                                                value={assignment.codeReviewVideoUrl}
                                                placeholder="https://screrencast-o-matic.com/username/repo-name"
                                            />
                                        </Col>
                                    </Form.Group>

                                <Row className="justify-content-center">
                                    <Col
                                        lg="6"
                                        className="d-flex flex-column gap-5 flex-md-row justify-content-md-between"
                                    ><div
                                    className='d-flex gap-5'>

                                        {assignment.status ==="Completed" ? <Button id='submit' size='lg' type='button' onClick={() => save(assignmentStatusEnums[4].status)}>Re-Claim</Button>: <Button id='submit' size='lg' type='button' onClick={() => save(assignmentStatusEnums[2].status)}>Complete Review</Button> }
                                        
                                    {assignment.status === "Need Update"? (<><Button id='submit' size='lg' variant='danger' type='button' onClick={() => save(assignmentStatusEnums[3].status)}>Reject Assignment</Button></>):(<><Button id='submit' size='lg' type='button' onClick={() => save(assignmentStatusEnums[2].status)}>Re-Claim</Button></>)}
                                    


                                            <Button id='back' size='lg' variant='secondary' type='button' onClick={() => (window.location.href = "/dashboard")} > Back </Button>  </div></Col></Row>
                            </Col>
                        </Row >

                    </>

                ) :
                    (<></>)}
            </Container>
        </div>
    );
};

export default ReviewerAssignmentView;