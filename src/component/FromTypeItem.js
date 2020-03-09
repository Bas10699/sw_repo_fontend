import React, { Component } from "react";
import { get, post } from "../service/service";
import swal from "sweetalert2";
import './bg.css'
import {
  Modal,
  Card,
  Row,
  Col,
  Container,
  CardGroup,
  CardDeck,
  FormControl,
  Button,
  Tab,
  Table,
  Accordion,
  Form
} from "react-bootstrap";
import './bg.css'
export default class FromTypeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      get_data: []
    };
  }
  componentDidMount() {
    this.get_type_item()
  }

  get_type_item = async () => {
    try {
      await get("typeName/get_typeName").then(result => {
        if (result.success) {
          this.setState({
            get_data: result.result
          });
          console.log(this.state.get_data);
        } else {
          swal("", "", "error");
        }
      });
    } catch (error) {
      alert("get_type_item: " + error);
    }
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      itemtype: e.target.value
    });
    console.log(this.state.itemtype);
  };

  delete_type = data => {
    console.log(data);
    
  swal
    .fire({
      title: "Are you sure?",
      text: "ต้องการลบ " + data.TN_name+ " หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    .then(result => {
      
      if (result.value) {
        this.delete_typeName(data);
      }
    });
};

delete_typeName = async data => {
  try {
    const obj = {
      TN_id: data.TN_id
    };
    console.log("OBJSD",this.state.TN_id);

    await post(obj, "typeName/delete_typeName").then(result => {
      if (result.success) {
        swal
          .fire({
            icon: "success",
            title: "Your Type has been deleted.",
            showConfirmButton: false,
            timer: 1500
          })
          .then(() => {
            window.location.reload();
          });
      }
    });
  } catch (error) {
    alert("delete_typeName: " + error);
  }
};

  additem = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: "ต้องการเพิ่ม " + this.state.itemtype + " หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!"
      })
      .then(result => {
        console.log(result);
        if (result.value) {
          this.add_type_item();
        }
      });
  };

  
  add_type_item = async () => {
    const obj = {
      TN_name: this.state.itemtype
    };
    console.log(obj);
    try {
      await post(obj, "typeName/add_typeName").then(result => {
        if (result.success) {
          swal
            .fire({
              icon: "success",
              title: "เพิ่มประเภทข้อมูล",
              showConfirmButton: false,
              timer: 1500
            })
            .then(() => {
              window.location.reload();
            });
        } else {
          swal.fire("", result.error_message, "error");
        }
      });
    } catch (error) {
      alert("add_type_item" + error);
    }
  };
  render() {
const {get_data}=this.state
    return (
      <Container  fluid={1} className='bg-fix'>
        <br/>
        <Row >
          <Col sm='3'>
              <Card  >
              <div className="card-header py-3 bg-info">
                <div className="col">
                  <h6 className="m-0 font-weight-bold text-light">
                    เพิ่มประเภทของอุปกรณ์
                  </h6>
                </div>
                {/* <button className="btn btn-primary">เพิ่ม</button> */}
              </div>
              <Card.Body>
                <FormControl
                  type="test"
                  id="item_type"
                  onChange={this.handleChange}
                ></FormControl>
                <br />
                <link
                  href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
                  rel="stylesheet"
                ></link>
                <Button
                  variant="primary "
                  className=" fa fa-plus bg-dark"
                  onClick={() => this.additem()}
                  size="lg"
                ></Button>
              </Card.Body>
            </Card>
            
          </Col>
          <Col className='text-center'>
          <Card className="bg-info">
          <h3 className="m-0 font-weight-bold text-dark ">
                      ตารางแสดงประเภทของอุปกรณ์ทั้งหมด
                    </h3>
          </Card>
          
            <Table striped bordered hover variant="info">

              <thead>
           
                <tr>
                  <th>ลำดับ</th>
                  <th>ประเภท</th>
                  <th>จำนวนผลิตภัณฑ์</th>
                  <th>เครื่องมือ</th>
                </tr>
                
                </thead>
                <tbody>
                {get_data.map((element, index) => {
                        return (
                          <tr>
                          <td>{index + 1}</td>
                          <td>{element.TN_name}</td>
                          <td>{element.count_id}</td>
                          <td >
                            <div className="btn-toolbar ">
                              <link
                                href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
                                rel="stylesheet"
                              ></link>

                              <button
                                onClick={() => this.delete_type(element)}
                                className=" btn btn-danger btn-lg	fas fa-trash-alt "
                                
                              />
                              
                              <Accordion defaultActiveKey="0">
                            <Accordion.Toggle  as={Button} variant="link" eventKey="1">
                                <Button className=" btn btn-primary btn-lg fa fa-pencil "></Button>
                            </Accordion.Toggle>

                          
                            <Accordion.Collapse eventKey="1">
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>รายละเอียด</Form.Label>
                                    <Form.Control as="textarea" rows="3" id="cn_notes"  />
                                </Form.Group>
                            </Accordion.Collapse>
                        </Accordion>

                            </div>
                          </td>
                        </tr>
                      );
                    })}

                </tbody>
         

            </Table>
          </Col>
        </Row>

      </Container>
    );
  }

}
