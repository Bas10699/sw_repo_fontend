import React, { Component } from "react";
import { get, ip, post } from "../service/service";
import swal from "sweetalert2";
import moment from "moment";
import { Button, Modal, Image, Row, Col, Form } from "react-bootstrap";
import "../App.css";
import ImageDefault from '../const/images.png'

class ThemeSwitcher extends Component {
  constructor() {
    super();
    this.state = {
      item_get_all: [],
      theme: null,
      showModal: false,
      showedit: false,
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

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(e.target.id);
  };

  update_item = async () => {
    const obj = {
      item_image: this.state.item_imag,
      item_id: this.state.item_id,
      item_name: this.state.item_name,
      item_series_number: this.state.item_series_number,
      item_type: this.state.item_type,
      item_date_of_birth: this.state.item_date_of_birth,
      item_place_of_birth: this.state.item_place_of_birth,
      item_status: this.state.item_status,
      item_gen: this.state.item_gen,
      item_brand: this.state.item_brand
    };

    console.log(obj);
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
    const { theme, item_get_all, showModal, modelIndex, showedit } = this.state;
    const themeClass = theme ? theme.toLowerCase() : "secondary";
    const itemModel = item_get_all[this.state.modelIndex];
    console.log(itemModel);
    const { item_image } = this.state
    return (
      <div>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              DataTables Example
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
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
                      <tr>
                        <td>{index + 1}</td>
                        <td>{element.item_name}</td>
                        <td>{element.item_series_number}</td>
                        <td>{element.item_type}</td>
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
                              onClick={() => this.update_item(element)}
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
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">DataTable with default features</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body table-responsive">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>ลำดับ</th>
                      <th>ชื่อ</th>
                      <th>series number</th>
                      <th>ประเภท</th>
                      <th>วันเกิด</th>
                      <th>สถานที่เกิด</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {item_get_all.map((element, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{element.item_name}</td>
                          <td>{element.item_series_number}</td>
                          <td>{element.item_type}</td>
                          <td>
                            {moment(element.item_date_of_birth).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td>{element.item_place_of_birth}</td>
                          <td>
                            <Button
                              onClick={() =>
                                this.setState({
                                  showModal: true,
                                  modelIndex: index
                                })
                              }
                            >
                              ดูรายละเอียด
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}

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
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              เเก้ไขข้อมูล
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="textarea"
                    onChange={this.handleChange}
                    id="item_id"
                    defaultValue={itemModel ? itemModel.item_id : ""}
                  ></Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>ชื่อ</Form.Label>
                  <Form.Control
                    type="textarea"
                    onChange={this.handleChange}
                    id="item_name"
                    defaultValue={itemModel ? itemModel.item_name : ""}
                  ></Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>series number</Form.Label>
                  <Form.Control
                    type="textarea"
                    onChange={this.handleChange}
                    id="item_series_number"
                    defaultValue={itemModel ? itemModel.item_series_number : ""}
                  />
                </Form.Group>
              </Form.Row>
            </Form>

            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>ประเภท</Form.Label>
                  <Form.Control
                    type="textarea"
                    onChange={this.handleChange}
                    id="item_type"
                    defaultValue={itemModel ? itemModel.item_type : ""}
                  />
                </Form.Group>
              </Form.Row>
            </Form>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>วันที่นำเข้า</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={this.handleChange}
                    id="item_date_of_birth"
                  />
                </Form.Group>
              </Form.Row>
            </Form>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>วันจำหน่าย</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={this.handleChange}
                    id="item_place_of_birth"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>รุ่น</Form.Label>
                  <Form.Control
                    type="textare"
                    onChange={this.handleChange}
                    id="item_gen"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>ยี่ห้อ</Form.Label>
                  <Form.Control
                    type="textare"
                    onChange={this.handleChange}
                    id="item_brand"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>รูปอุปกรณ์</Form.Label>
                <div className="img-resize" style={{ opacity: ".5" }}>
                  <Image src={item_image ? item_image : ImageDefault} rounded />
                </div>

                <Form.Control type="file" onChange={this.uploadpicture} />

                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Form>
            <Form.Group as={Col} md="3" controlId="item_status">
              <Form.Label>สถานะอุปกรณ์</Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="ติดตั้ง"
                  name="item_status"
                  id="item_status"
                  value="1"
                  onChange={this.handleChange}
                />
                <Form.Check
                  type="radio"
                  label="พร้อมใช้งาน"
                  name="item_status"
                  id="item_status"
                  value="2"
                  onChange={this.handleChange}
                />
                <Form.Check
                  type="radio"
                  label="ส่งซ่อม"
                  name="item_status"
                  id="item_status"
                  value="3"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.update_item()}>Edit</Button>
            <Button onClick={() => this.setState({ showedit: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ThemeSwitcher;
