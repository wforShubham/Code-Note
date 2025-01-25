import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                About Code Note
              </Card.Title>
              <Card.Text className="text-muted">
                <strong>Code Note</strong> is a full-stack application built using the **MERN** stack:
                MongoDB, Express.js, React.js, and Node.js. It provides users with a platform to
                store and manage notes securely. Whether you're writing quick reminders or in-depth notes,
                Code Note offers a user-friendly interface with powerful features.
              </Card.Text>

              <Card.Text>
                <h5>Features:</h5>
                <ul>
                  <li>Create, Read, Update, and Delete Notes (CRUD operations)</li>
                  <li>Secure authentication with JWT (JSON Web Token)</li>
                  <li>Real-time updates via RESTful APIs</li>
                  <li>Responsive design for all screen sizes</li>
                </ul>
              </Card.Text>

              <Card.Text className="mt-3">
                <strong>Technologies used:</strong>
                <ul>
                  <li>Frontend: React.js, React Router</li>
                  <li>Backend: Node.js, Express.js</li>
                  <li>Database: MongoDB</li>
                  <li>Authentication: JWT</li>
                  <li>State Management: Redux</li>
                </ul>
              </Card.Text>

              <Button variant="primary" href="https://github.com/wforShubham/inotebook.git" target="_blank">
                Check out the Code
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
