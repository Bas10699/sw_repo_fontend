import React, { Component } from 'react';
import '../App.css';
import { NavDropdown, Navbar, Nav, Card, CardGroup, CardDeck, Container, Row, Col, Tab } from 'react-bootstrap';
import TestBoostarp from './DataTable'
import { get, post } from '../service/service'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item_status: []
    }
  }

  componentDidMount() {
    const script = document.createElement("script")
    script.src = 'js/content.js'
    script.async = true

    document.body.appendChild(script)
  }
  componentWillMount() {
    this.get_item_status()
  }
  get_item_status = async () => {
    try {
      await get("item/get_item_status").then((result) => {
        if (result.success) {
          this.setState({
            item_status: result.result
          })
          console.log(result.result)
        }
        else {
          // swal("", "", "error")
        }
      })
    }
    catch (error) {
      alert("get_item_status: " + error)
    }
  }

  render_status = (name, count) => {
    let return_page
    switch (name) {
      case 1: return_page = <div className="col-lg-4 ">
        {/* small box */}
        <div className="small-box bg-warning">
          <div className="inner">
            <h3>{count}</h3>
            <p>ติดตั้ง</p>
          </div>
          <div className="icon">
            <i className="ion ion-paper-airplane" />
          </div>
         
        </div>
      </div>
        break;
      case 2: return_page = <div className="col-lg-4">
        {/* small box */}
        <div className="small-box bg-success">
          <div className="inner">
            <h3>{count}</h3>
            <p>พร้อมใช้งาน</p>
          </div>
          <div className="icon">
            <i className="ion ion-ios-home-outline" />
          </div>
          
        </div>
      </div>
        break;
      case 3: return_page =
        <div className="col-lg-4">
          {/* small box */}
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>{count}</h3>
              <p>ส่งซ่อม</p>
            </div>
            <div className="icon">
              <i className="fas fa-cog" />
            </div>
          </div>
        </div>
        break;
    }
    return return_page
  }

  render() {
    const { item_status } = this.state
    return (
      <Container fluid={true}>
        
        {/* <Row>
          <Col sm={1}>
          </Col>
          <Col>
            <CardDeck> */}
        <div className="row">

          {item_status.map((element,index) => {
            return this.render_status(element.item_status, element.count_status)
          })}
        </div>

        {/* </CardDeck>

          </Col>
          <Col sm={1}>

          </Col>
        </Row > */}
        <TestBoostarp />


      </Container >
    )
  }
}
export default Dashboard;