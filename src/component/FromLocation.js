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

export default class FromLocation extends Component {
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
        this.get_location();
    }


    get_location = async () => {
        try {
            await get("airport/get_airport").then(result => {
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
            alert("get_location: " + error);
        }
    };

    handleChange = e => {
        console.log(e.target.value);
        this.setState({
          airport: e.target.value
        });
        console.log(this.state.airport);
      };

      
  add_airport = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: "ต้องการเพิ่ม " + this.state.airport + " หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!"
      })
      .then(result => {
        console.log(result);
        if (result.value) {
          this.add_ariport_location();
        }
      });
  };

  add_ariport_location = async () => {
    const obj = {
      ap_name: this.state.airport
    };
    console.log(obj);
    try {
      await post(obj, "airport/add_airport").then(result => {
        if (result.success) {
          swal
            .fire({
              icon: "success",
              title: "เพิ่มสถานที่สำเร็จ",
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
      alert("add_ariport_location" + error);
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
                                    <div className="col ">
                                        <h6 className=" font-weight-bold text-primary">
                                            <br />
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
                                            {get_data.map((element, index) => {

                                                return (<tr>

                                                    <td> {index + 1}</td>
                                                    <td> {element.ap_name}</td>

                                                    <td> {element.count_item}</td>
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
                                                
                                                )
                                            })
                                            
                                            }
                                            
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
                    เพิ่มสถานที่ติดตั้ง
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
                  onClick={() => this.add_airport()}
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