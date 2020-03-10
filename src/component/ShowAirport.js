import React, { Component } from 'react'
import { Container, Row, Col, InputGroup, ButtonGroup, FormControl } from 'react-bootstrap'
import swal from 'sweetalert'
import { get } from '../service/service'
import { NavLink } from 'react-router-dom'
import Pagination from '../const/Pagination'
import { status_item, status_item_color, sortData } from '../const/constance'

export default class ShowAirport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            airport_all: [],
            airport_all_origin: [],
            item_get_all: [],
            currentPage: 1,
            todosPerPage: 10,
        }
    }
    componentWillMount() {
        this.get_airport()
        this.get_item_all()
    }
    get_airport = async () => {
        try {
            await get("airport/get_airport").then(result => {
                if (result.success) {
                    this.setState({
                        airport_all: result.result,
                        airport_all_origin: result.result
                    });
                    console.log(this.state.airport_all);
                } else {
                    swal("", result.error_message, "error");
                }
            });
        }
        catch (error) {
            alert("get_airport: " + error)
        }
    }

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

    sortItem = (type) => {

        sortData(this.state.item_get_all, type, this.state.sort)
        this.setState(({ sort }) => (
          {
            sort: !sort
          }
        ));
      }

    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
        //fetch a data
        //or update a query to get data
    };
    renderItemAirport() {

        let todos = []
        const { currentPage, todosPerPage, item_get_all } = this.state;
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
                                        <td className={status_item_color(element.item_status)}>{status_item(element.item_status)}</td>
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
        )
    }

    renderItem() {

    }

    render() {
        const background = localStorage.getItem('background')
        const { airport_all, airport_all_origin } = this.state
        return (
            <Container fluid={true} className={background === 'true' ? "bg-akeno" : ""}>
                <br />
                {/* <Row>
          <Col sm={1}>
          </Col>
          <Col>
            <CardDeck> */}
                <Row>
                    <div className="col-lg-3">
                        {/* small box */}
                        <div className="small-box bg-light">
                            <div className="inner">
                                <h3>{airport_all.length}</h3>
                                <p>สถานที่ติดตั้งทั้งหมด</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-location-arrow" />
                            </div>

                        </div>
                    </div>
                </Row>
                <div className="row">

                    {airport_all.map((element, index) => {
                        return <div className="col-lg-3">
                            {/* small box */}
                            <div className="small-box bg-secondary">
                                <div className="inner">
                                    <h3>{element.count_item}</h3>
                                    <p>{element.ap_name}</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-wine-bottle" />
                                </div>
                                <a className="small-box-footer" onClick={() => this.setState({ airport_all: airport_all_origin })}>More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                    })}


                </div>
                {this.renderItemAirport()}

            </Container >
        )
    }
}
