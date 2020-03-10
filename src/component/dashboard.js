import React, { Component } from 'react';
import '../App.css';
import { Card, Container, Button, Modal, ButtonGroup, Row, Col, FormControl, InputGroup} from 'react-bootstrap';
import { get, ip, post } from '../service/service'
import swal from "sweetalert2";
import moment from "moment";
import { sortData } from '../const/constance'
import { NavLink } from 'react-router-dom'
import Pagination from '../const/Pagination'
import './bg.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item_status: [],

      item_get_all: [],
      item_get_all_origin: [],
      item_image: null,
      theme: null,
      showModal: false,
      showedit: false,
      item_get_type: [],
      modelIndex: 0,
      get_data: [],
      item_filter_status: [],
      data_calender: [],
      sort: true,
      currentPage: 1,
      todosPerPage: 10,
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
    this.get_item_all();
    this.get_location();
  }
  get_item_status = async () => {
    try {
      await get("item/get_item_status").then((result) => {
        if (result.success) {
          this.setState({
            item_status: result.result
          })
          // console.log(result.result)
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

  resetTheme = evt => {
    evt.preventDefault();
    this.setState({ theme: null });
  };

  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    this.setState({ theme });
  };


  get_item_all = async () => {
    try {
      await get("item/get_item_all").then(result => {
        if (result.success) {
          this.setState({
            item_get_all: result.result,
            item_get_all_origin: result.result,
            item_filter_status: result.result
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
        // console.log(result);
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

  get_location = async () => {
    try {
      await get("airport/get_airport").then(result => {
        if (result.success) {
          this.setState({
            get_data: result.result
          });
          // console.log(this.state.get_data);
        } else {
          swal("", "", "error");
        }
      });
    } catch (error) {
      alert("get_location: " + error);
    }
  };

  get_calender = async (id) => {
    try {
      const obj = {
        item_id: id
      }
      await post(obj, "calender/get_calender_item").then((result) => {
        if (result.success) {
          this.setState({
            data_calender: result.result,
          })
          console.log(result.result)
        }
        else {
          swal.fire("", result.error_message, "error");
        }
      })
    }
    catch (error) {
      alert("get_canlender: " + error)
    }
  }

  select_ap = e => {


    // console.log(e.target.value);
    this.setState({
      selectap: e.target.value
    });
    // console.log(this.state.selectap);
  };


  select_type = e => {
    // console.log(e.target.value);
    this.setState({
      selecttype: e.target.value
    });
    // console.log(this.state.selecttype);
  };



  handleChange = e => {
    // console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
    // console.log(e.target.value);
  };


  status_item = data => {
    let return_data;
    switch (data) {
      case 1:
        return_data = <div className="text-success">ติดตั้ง</div>;
        break;
      case 2:
        return_data = <div className="text-info ">พร้อมใช้งาน</div>;
        break;
      case 3:
        return_data = <div className="text-warning ">ส่งซ่อม</div>;
        break;
        case 4:
          return_data = <div className="text-danger">เสีย</div>;
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

  setModel = (id, index) => {
    this.setState({
      showModal: true,
      modelIndex: index
    })
    this.get_calender(id)
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  filterStatus = (status) => {
    const dateSearch = status
    // console.log(dateSearch)

    var updatedList = this.state.item_get_all_origin;
    // console.log(updatedList)
    updatedList = updatedList.filter((item) => {
      return item.item_status.toString().search(dateSearch) !== -1;
    });
    // console.log(updatedList)
    this.setState({
      item_get_all: updatedList,
      item_filter_status: updatedList
    });
  }

  filteritem = (e) => {
    const dateSearch = e.target.value
    // console.log(dateSearch)

    var updatedList = this.state.item_filter_status;
    // console.log(updatedList)
    updatedList = updatedList.filter((item) => {
      let data = item.item_name.toLowerCase() + item.item_series_number.toLowerCase() + item.TN_name.toLowerCase()
      return data.search(dateSearch) !== -1;
    });
    // console.log(updatedList)
    this.setState({
      item_get_all: updatedList
    });
  }

  sortItem = (type) => {

    sortData(this.state.item_get_all, type, this.state.sort)
    this.setState(({ sort }) => (
      {
        sort: !sort
      }
    ));
  }

  render_status = (name, count) => {
    let return_page
    switch (name) {
      case 1: return_page = <div className="col-lg-3 ">
        {/* small box */}
        <div className="small-box bg-success">
          <div className="inner">
            <h3>{count}</h3>
            <p>ติดตั้ง</p>
          </div>
          <div className="icon">
            <i className="ion ion-paper-airplane" />
          </div>
          <a className="small-box-footer" onClick={() => this.filterStatus(1)}>More info <i className="fas fa-arrow-circle-right" /></a>
        </div>
      </div>
        break;
      case 2: return_page = <div className="col-lg-3">
        {/* small box */}
        <div className="small-box bg-info ">
          <div className="inner">
            <h3>{count}</h3>
            <p>พร้อมใช้งาน</p>
          </div>
          <div className="icon">
            <i className="ion ion-ios-home-outline" />
          </div>
          <a className="small-box-footer" onClick={() => this.filterStatus(2)}>More info <i className="fas fa-arrow-circle-right" /></a>
        </div>
      </div>
        break;
      case 3: return_page =
        <div className="col-lg-3">
          {/* small box */}
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>{count}</h3>
              <p>ส่งซ่อม</p>
            </div>
            <div className="icon">
              <i className="fas fa-cog" />
            </div>
            <a className="small-box-footer" onClick={() => this.filterStatus(3)}>More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        break;


        case 4: return_page =
        <div className="col-lg-3">
          {/* small box */}
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>{count}</h3>
              <p>เสีย</p>
            </div>
            <div className="icon">
            <i class="fas fa-ban"></i>
            </div>
            <a className="small-box-footer" onClick={() => this.filterStatus(4)}>More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        break;
    }
    return return_page
  }

  renderModel() {
    const { data_calender } = this.state

    return (

      <div className="container mt-1 mb-5">
        <div className="row">
          <div className="col-md-12">

            {data_calender[0] ?
              <ul className="timelineSet">
                {data_calender.map((element, index) => {
                  return <li key={index}>
                    <h5 href="#" >{moment(element.cn_date).format("DD/MM/YYYY")}</h5>
                    {/* <button className="btn btn-danger btn-sm float-right" onClick={() => this.alertDelete(element)}>ลบ</button> */}
                    {/* <h5>{element.cn_head}</h5> */}
                    <p>{element.cn_notes}</p>
                  </li>

                })}
              </ul> :
              <div>ไม่พบรายการ</div>}
          </div>
        </div>
      </div>


    )
  }
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage });
    //fetch a data
    //or update a query to get data
};

  render() {
    const background = localStorage.getItem('background')
    const { item_status, theme, item_get_all, showModal, item_get_all_origin } = this.state
    const themeClass = theme ? theme.toLowerCase() : "secondary";
    const itemModel = item_get_all[this.state.modelIndex];

    let todos = []
    const { currentPage, todosPerPage } = this.state;
    item_get_all.map((element, index) => {
      todos.push({
        num: index + 1,
        ...element
      })
    })

    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
      <Container fluid={true} className={background === 'true' ? "bg-akeno" : ""}>
        <br />
        {/* <Row>
          <Col sm={1}>
          </Col>
          <Col>
            <CardDeck> */}
        <div className="row">

          {item_status.map((element, index) => {
            return this.render_status(element.item_status, element.count_status)
          })}

          <div className="col-lg-3">
            {/* small box */}
            <div className="small-box bg-secondary">
              <div className="inner">
                <h3>{item_get_all_origin.length}</h3>
                <p>ทั้งหมด</p>
              </div>
              <div className="icon">
                <i className="fas fa-wine-bottle" />
              </div>
              <a className="small-box-footer" onClick={() => this.setState({ item_get_all: item_get_all_origin })}>More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
        </div>

        {/* </CardDeck>

          </Col>
          <Col sm={1}>

          </Col>
        </Row > */}

        <div >
          <Row>
            <Col lg={9}></Col>
            <Col lg={3}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="ค้นหา"
                  onChange={this.filteritem}
                />
                <InputGroup.Append>
                  <InputGroup.Text ><div className="fas fa-search"></div></InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>

          </Row>

          <div className="">
            {/* <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              DataTables Example
            </h6>
          </div> */}
            {/* <div className="card-body"> */}
            <div className="table-responsive">
              <table
                className="table table-bordered table-striped"
                // id="dataTable"
                width="100%"
              >
                <thead>
                  <tr>
                    <th >ลำดับ</th>
                    <th style={{ cursor: "pointer" }} onClick={() => this.sortItem("item_name")}>ชื่อ</th>
                    <th style={{ cursor: "pointer" }} onClick={() => this.sortItem("item_series_number")}>series number</th>
                    <th style={{ cursor: "pointer" }} onClick={() => this.sortItem("TN_name")}>ประเภท</th>
                    <th style={{ cursor: "pointer" }} onClick={() => this.sortItem("ap_name")}>สถานที่ติดตั้ง</th>
                    <th style={{ cursor: "pointer" }} onClick={() => this.sortItem("item_status")}>สถานะ</th>
                    <th>ตัวเลือก</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTodos.map((element, index) => {

                    return (
                      <tr key={index}>
                        <td>{element.num}</td>

                        <td>{element.item_name}</td>
                        <td>{element.item_series_number}</td>
                        <td>{element.TN_name}</td>
                        <td>{element.ap_name}</td>
                        <td>{this.status_item(element.item_status)}</td>
                        <td>
                          <div className="btn-toolbar">
                            <link
                              href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
                              rel="stylesheet"
                            ></link>
                            <ButtonGroup>
                              <button
                                onClick={() => this.setModel(element.item_id, index)}
                                className=" btn btn-primary 	fa fa-search"
                              />
                              <button
                                onClick={() => this.delete_item(element)}
                                className=" btn btn-danger btn-sm	fas fa-trash-alt "
                              />
                              {/* <button className=" btn btn-primary  fa fa-pencil"> */}
                              <NavLink to={"/editdata/item?item_id=" + element.item_id} className=" btn btn-primary  fa fa-pencil" />
                              {/* </button> */}

                            </ButtonGroup>
                          </div>
                        </td>

                        {/* <td><Button onClick={() => this.setState({ showModal: true, modelIndex: index })}>ดูรายละเอียด</Button></td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Row >
                <Col></Col>
               <Pagination 
                urrentPage={currentPage}
                totalPages={Math.ceil(todos.length / todosPerPage)}
                changeCurrentPage={this.changeCurrentPage}
                theme="square-fill"
              />
              <Col></Col>
              {/* </div> */}
              </Row>
            </div>
           
          </div>

          <Modal
            show={showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={this.handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                รายละเอียดอุปกรณ์

            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={5}>
                  <div className="img-resize">
                    <img src={itemModel ? ip + itemModel.item_image : ""} />
                  </div>
                </Col>

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
                    {/* {console.log(itemModel)} */}
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


              </Row>
              <br />
              <Card>
                <p>  หมายเหตุ...</p>
                {this.renderModel()}
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ showModal: false })}>
                Close
            </Button>

            </Modal.Footer>
          </Modal>

        </div>


      </Container >
    )
  }
}
export default Dashboard;