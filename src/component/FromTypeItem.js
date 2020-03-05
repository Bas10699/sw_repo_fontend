import React, { Component } from "react";
import { get, post } from "../service/service";
import swal from "sweetalert2";
import {
  Modal,
  Card,
  Row,
  Col,
  Container,
  CardGroup,
  CardDeck,
  FormControl,
  Button
} from "react-bootstrap";

export default class FromTypeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      get_data: []
    };
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "js/content.js";
    script.async = true;

    document.body.appendChild(script);
  }

  componentWillMount() {
    this.get_type_item();
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
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      itemtype: e.target.value
    });
    console.log(this.state.itemtype);
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
    const { get_data } = this.state;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <CardDeck className="text-center">
            <Card>
              <Card className="card-header py-3">
                <div>
                  <div className="col">
                    <h6 className="m-0 font-weight-bold text-primary">
                      ตารางแสดงประเภทของอุปกรณ์ทั้งหมด
                    </h6>
                  </div>
                  <br />
                  {/* <button className="btn btn-primary">เพิ่ม</button> */}
                </div>
              </Card>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered" width="auto">
                    <thead>
                      <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อประเภท</th>
                        <th>จำนวนทั้งหมด</th>
                        <th>ลบ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.get_data.map((element, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{element.TN_name}</td>
                            <td>{element.count_id}</td>
                            <td>
                              <div className="btn-toolbar">
                                <link
                                  href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
                                  rel="stylesheet"
                                ></link>

                                <button
                                  onClick={() => this.delete_type(element)}
                                  className=" btn btn-danger btn-sm	fas fa-trash-alt "
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </CardDeck>
          <CardDeck className="text-center">
            <Card>
              <div className="card-header py-3">
                <div className="col">
                  <h6 className="m-0 font-weight-bold text-primary">
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
                  className=" fa fa-plus"
                  onClick={() => this.additem()}
                  size="lg"
                ></Button>
              </Card.Body>
            </Card>
          </CardDeck>
        </Row>
      </Container>
    );
  }
}
