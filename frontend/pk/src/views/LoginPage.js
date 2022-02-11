import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'

const LoginPage = () => {
    return (
        <Container>
            <Row>
                <Col xs={6} >
                    <LoginForm />
                </Col>
                <Col xs={6} >
                    <RegistrationForm />
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage
