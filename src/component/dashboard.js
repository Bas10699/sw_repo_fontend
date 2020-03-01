import React,{Component} from 'react';
import '../App.css';
import { NavDropdown, Navbar, Nav, Card, CardGroup, CardDeck, Container, Row, Col, Tab } from 'react-bootstrap';
import TestBoostarp from './DataTable'

class Dashboard extends Component {
  componentDidMount(){
    const script = document.createElement("script")
    script.src = 'js/content.js'
    script.async = true

    document.body.appendChild(script)
  }
    render() {
        return (
            <Container fluid="true">
                  <br />
                  <Row>
                    <Col sm={1}>
                    </Col>
                    <Col>
                      <CardDeck>
                        <Card border="info">
                          <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                              ลองๆดู
      </Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                          </Card.Footer>
                        </Card>
                        <Card border="info">
                          <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                              อิหยังวะ
                            </Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                          </Card.Footer>
                        </Card>
                        <Card border="info" style={{ width: '18rem' }}>
                          <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                              10/100/1000
      </Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                          </Card.Footer>
                        </Card>

                      </CardDeck>

                      <br />
                      <TestBoostarp />

                    </Col>
                    <Col sm={1}>

                    </Col>
                  </Row>
                 

                </Container>
        )
    }
}
export default Dashboard;