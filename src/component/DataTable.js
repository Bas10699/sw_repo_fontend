import React, { Component } from "react";
import { get, ip, post } from "../service/service";
import swal from "sweetalert2";
import moment from "moment";
import {
  Button,
  Modal,
  Image,
  Row,
  Col,
  Form,
  Dropdown,
  DropdownButton,
  Container,
  Card,
  InputGroup,
  CardDeck
} from "react-bootstrap";
import "../App.css";
import ImageDefault from "../const/images.png";

class ThemeSwitcher extends Component {
  constructor() {
    super();
    this.state = {
      item_get_all: [],
      item_image: null,
      theme: null,
      showModal: false,
      showedit: false,
      item_get_type: [],
      modelIndex: 0
    };
  }

  resetTheme = evt => {
    evt.preventDefault();
    this.setState({ theme: null });
  };

  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    this.setState({ theme });
  };

  componentWillMount() {
    this.get_item_all();
    this.get_item_type();
  }

  get_item_all = async () => {
    try {
      await get("item/get_item_all").then(result => {
        if (result.success) {
          this.setState({
            item_get_all: result.result
          });
        } else {
          swal.fire("", result.error_message, "warning");
        }
      });
    } catch (error) {
      alert("get_item_all" + error);
    }
  };

  delete_item = data => {
    swal
      .fire({
        title: "Are you sure?",
        text: "ต้องการลบ " + data.item_name + " หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
      .then(result => {
        console.log(result);
        if (result.value) {
          this.delete_item_post(data);
        }
      });
  };

  delete_item_post = async data => {
    try {
      const obj = {
        item_id: data.item_id
      };

      await post(obj, "item/delete_item").then(result => {
        if (result.success) {
          swal
            .fire({
              icon: "success",
              title: "Your file has been deleted.",
              showConfirmButton: false,
              timer: 1500
            })
            .then(() => {
              window.location.reload();
            });
        }
      });
    } catch (error) {
      alert("delete_item: " + error);
    }
  };

  select_type = e => {
    console.log(e.target.value);
    this.setState({
      selecttype: e.target.value
    });
    console.log(this.state.selecttype);
  };

  get_item_type = async () => {
    try {
      await get("typeName/get_typeName_select").then(result => {
        if (result.success) {
          this.setState({
            item_get_type: result.result
          });
          console.log(this.state.item_get_type);
        } else {
          swal.fire("", result.error_message, "warning");
        }
      });
    } catch (error) {
      alert("get_item_all" + error);
    }
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(e.target.value);
  };

  update_item = async item_id => {
    const obj = {
      item_id: item_id,
      item_name: this.state.item_name,
            item_brand: this.state.item_brand,
            item_gen: this.state.item_gen,
            item_type: this.state.selecttype,
            item_series_number: this.state.item_series_number,
            item_date_of_birth: this.state.item_date_of_birth,
            item_place_of_birth: this.state.item_place_of_birth,
            item_status: this.state.item_status,
            item_image: this.state.item_image,
            item_airport:this.state.item_airport,
            item_airport_date:this.state.item_airport_date,

    };

    console.log("gg", obj);
    try {
      await post(obj, "item/update_item").then(result => {
        if (result.success) {
          window.location.reload();
        } else {
          swal.fire("", result.error_message, "error");
        }
      });
    } catch (error) {
      alert("add_data" + error);
    }
  };

  status_item = data => {
    let return_data;
    switch (data) {
      case 1:
        return_data = <div className="text-success">ติดตั้ง</div>;
        break;
      case 2:
        return_data = <div className="text-warning">พร้อมใช้งาน</div>;
        break;
      case 3:
        return_data = <div className="text-danger">ส่งซ่อม</div>;
    }
    return return_data;
  };

  uploadpicture = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (!file) {
    } else {
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log("img", reader.result);
        this.setState({
          item_image: reader.result
        });
      };
    }
  };
  render() {
    const {
      theme,
      item_get_all,
      showModal,
      modelIndex,
      showedit,
      item_get_type
    } = this.state;
    const themeClass = theme ? theme.toLowerCase() : "secondary";
    const itemModel = item_get_all[this.state.modelIndex];
    console.log(itemModel);
    const { item_image } = this.state;
    return (
      <div>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              DataTables Example
            </h6>
          </div>
          <div className="card-body">
            {/* <div className="table table-bordered table-striped"> */}
              <table
                className="table table-bordered table-striped"
                id="dataTable"
                width="100%"
              >
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อ</th>
                    <th>series number</th>
                    <th>ประเภท</th>
                    <th>สถานะ</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {item_get_all.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td>{index+1}</td>

                        <td>{element.item_name}</td>
                        <td>{element.item_series_number}</td>
                        <td>{element.TN_name}</td>
                        <td>{this.status_item(element.item_status)}</td>
                        <td>
                          <div className="btn-toolbar">
                            <link
                              href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
                              rel="stylesheet"
                            ></link>
                            <button
                              onClick={() =>
                                this.setState({
                                  showModal: true,
                                  modelIndex: index
                                })
                              }
                              className=" btn btn-primary 	fa fa-search"
                            />
                            <button
                              onClick={() => this.delete_item(element)}
                              className=" btn btn-danger btn-sm	fas fa-trash-alt "
                            />
                            <button
                              onClick={() => this.get_item_type}
                              onClick={() =>
                                this.setState({
                                  showedit: true,
                                  modelIndex: index
                                })
                              }
                              className=" btn btn-primary  fa fa-pencil"
                            />
                          </div>
                        </td>

                        {/* <td><Button onClick={() => this.setState({ showModal: true, modelIndex: index })}>ดูรายละเอียด</Button></td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            {/* </div> */}
          </div>
        </div>

        <Modal
          show={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              รายละเอียดอุปกรณ์
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <div className="img-resize">
                  <img src={itemModel ? ip + itemModel.item_image : ""} />
                </div>
              </Col>
              <Col>
                <table>
                  <td>
                    <tr>ชื่อ </tr>
                    <tr>ยี่ห้อ </tr>
                    <tr>รุ่น </tr>
                    <tr>ซีเรียล </tr>
                    <tr>ประเภท </tr>
                    <tr>สถานที่ติดตั้ง </tr>
                    <tr>วันที่ติดตั้ง </tr>
                    <tr>วันที่นำเข้า </tr>
                    <tr>นำเข้ามาจาก </tr>
                    <tr>สถานะ </tr>
                  </td>
                  <td>
                    {console.log(itemModel)}
                    <tr>{itemModel ? itemModel.item_name : ""}</tr>
                    <tr>{itemModel ? itemModel.item_brand : ""}</tr>
                    <tr>{itemModel ? itemModel.item_gen : ""}</tr>
                    <tr>{itemModel ? itemModel.item_series_number : ""}</tr>
                    <tr>{itemModel ? itemModel.item_type : ""}</tr>
                    <tr>{itemModel ? itemModel.item_airport : ""}</tr>
                    <tr>{itemModel ? itemModel.item_airport_date : ""}</tr>
                    <tr>
                      {itemModel
                        ? moment(itemModel.item_date_of_birth).format(
                            "DD/MM/YYYY"
                          )
                        : ""}
                    </tr>
                    <tr>{itemModel ? itemModel.item_place_of_birth : ""}</tr>
                    <tr>{itemModel ? itemModel.item_status : ""}</tr>
                  </td>
                </table>
                <p>หมายเหตุ...</p>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showedit}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              เเก้ไขข้อมูล
            </Modal.Title>
            <button
              type="button"
              class="close"
              aria-label="Close"
              onClick={() => this.setState({ showedit: false })}
            >
              <span aria-hidden="true">×</span>
            </button>
          </Modal.Header>

          <Container fluid="true">
            <br />
            <Row>
              <Col sm={2}></Col>
              <Col>
                <CardDeck>
                  <Card border="info">
                    <Card.Body>
                      <Form noValidate>
                        <Form.Row className="text-center">
                          <Form.Group as={Col} md="4">
                            <Form.Label>ชื่ออุปกรณ์</Form.Label>
                            <Form.Control
                              type="text"
                              name="item_name"
                              onChange={this.handleChange}
                              id="item_name"
                              defaultValue={
                                itemModel ? itemModel.item_name : ""
                              }
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md="4">
                            <Form.Label>ยี่ห้อ</Form.Label>
                            <Form.Control
                              type="text"
                              name="item_brand"
                              onChange={this.handleChange}
                              id="item_brand"
                              defaultValue={
                                itemModel ? itemModel.item_brand : ""
                              }
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md="4">
                            <Form.Label>รุ่น</Form.Label>
                            <Form.Control
                              type="text"
                              name="item_gen"
                              id="item_gen"
                              defaultValue={itemModel ? itemModel.item_gen : ""}
                              onChange={this.handleChange}
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md="4">
                            <Form.Label>ประเภท</Form.Label>
                            <Form.Control
                              as="select"
                              id="TN_id"
                              onChange={this.select_type}
                            >
                              <option>กรุณาเลือกประเภท</option>
                              {item_get_type.map((element, index) => {
                                return (
                                  <option value={element.TN_id} key={index}>
                                    {element.TN_name}
                                  </option>
                                );
                              })}
                            </Form.Control>
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md="4">
                            <Form.Label>Series Number</Form.Label>
                            <InputGroup>
                              <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">
                                  S/N
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="text"
                                placeholder=""
                                aria-describedby="inputGroupPrepend"
                                name="item_series_number"
                                onChange={this.handleChange}
                                id="item_series_number"
                                defaultValue={
                                  itemModel ? itemModel.item_series_number : ""
                                }
                              />
                              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>

                          <Form.Group as={Col} md="4">
                            <Form.Label>สถานที่จำหน่าย</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="America"
                              onChange={this.handleChange}
                              id="item_place_of_birth"
                            />
                          </Form.Group>

                          <Form.Group as={Col} md="4">
                            <Form.Label>นำเข้ามาวันที่</Form.Label>
                            <Form.Control
                              type="date"
                              
                              onChange={this.handleChange}
                              id="item_date_of_birth"
                            />
                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationFormik05"
                          >
                            <Form.Label>สถานที่ติดตั้ง</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="AirportSakon"
                              name="item_airport"
                              id="item_airport"
                              onChange={this.handleChange}
                            />

                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationFormik05"
                          >
                            <Form.Label>วันที่ติดตั้ง</Form.Label>
                            <Form.Control
                              type="date"
                              placeholder="AirportSakon"
                              name="item_airport_date"
                              id="item_airport_date"
                              onChange={this.handleChange}
                            />

                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col} md="6">
                            <Form.Label>รูปอุปกรณ์</Form.Label>
                            <div
                              className="img-resize"
                              style={{ opacity: ".5" }}
                            >
                              <Image
                                src={item_image ? item_image : ImageDefault}
                                rounded
                              />
                            </div>

                            <Form.Control
                              type="file"
                              onChange={this.uploadpicture}
                            />

                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                          </Form.Group>

                          <Col>
                            <Form.Group
                              as={Col}
                              sl="5"
                              controlId="validationFormik05"
                             
                            >
                              <Form.Label>สถานะอุปกรณ์</Form.Label>
                              <Col sm={10}>
                                <Form.Check
                                  type="radio"
                                  label="ติดตั้ง"
                                  name="item_status"
                                  value="1"
                                  id="item_status"
                                  onChange={this.handleChange}
                                />
                                <Form.Check
                                  type="radio"
                                  label="พร้อมใช้งาน"
                                  name="item_status"
                                  value="2"
                                  id="item_status"
                                  onChange={this.handleChange}
                                />
                                <Form.Check
                                  type="radio"
                                  label="ส่งซ่อม"
                                  name="item_status"
                                  value="3"
                                  id="item_status"
                                  onChange={this.handleChange}
                                />
                              </Col>
                            </Form.Group>
                          </Col>
                        </Form.Row>

                        <Button
                          className="float-right btn  fa fa-pencil"
                          onClick={() => this.update_item(itemModel.item_id)}
                        >
                          เเก้ไขข้อมูล
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </CardDeck>
              </Col>
              <Col sm={2}></Col>
            </Row>
          </Container>
        </Modal>
      </div>
    );
  }
}

export default ThemeSwitcher;
