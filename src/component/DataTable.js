import React, { Component } from 'react';
import { get, ip } from '../service/service'
import swal from 'sweetalert2'
import moment from 'moment'
import { Button, Modal, Image, Row, Col } from 'react-bootstrap';
import "../App.css"

class ThemeSwitcher extends Component {
  constructor() {
    super();
    this.state = {
      item_get_all: [],
      theme: null,
      showModal: false,
      modelIndex: 0
    }
  }


  resetTheme = evt => {
    evt.preventDefault();
    this.setState({ theme: null });
  }

  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    this.setState({ theme });
  }

  componentWillMount() {
    this.get_item_all()
  }

  get_item_all = async () => {
    try {
      await get('item/get_item_all').then((result) => {
        if (result.success) {
          this.setState({
            item_get_all: result.result
          })
        }
        else {
          swal("", result.error_message, "warning");
        }
      })
    }
    catch (error) {
      alert('get_item_all' + error)
    }
  }

  render() {

    const { theme, item_get_all, showModal, modelIndex } = this.state;
    const themeClass = theme ? theme.toLowerCase() : 'secondary';
    const itemModel = item_get_all[this.state.modelIndex]
    console.log(itemModel)

    return (
      <div>

        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">

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
                        <td>{moment(element.item_date_of_birth).format('DD/MM/YYYY')}</td>
                        <td>{element.item_place_of_birth}</td>
                        <td><Button onClick={() => this.setState({ showModal: true, modelIndex: index })}>ดูรายละเอียด</Button></td>
                      </tr>
                    )
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
                <table id="example1" className="table table-bordered table-striped" >
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
                        <td>{moment(element.item_date_of_birth).format('DD/MM/YYYY')}</td>
                        <td>{element.item_place_of_birth}</td>
                        <td><Button onClick={() => this.setState({ showModal: true, modelIndex: index })}>ดูรายละเอียด</Button></td>
                      </tr>
                    )
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
          <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
              รายละเอียดอุปกรณ์
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <div className="img-resize">
                  <img src={itemModel ? ip + itemModel.item_image : ''} />
                </div>

              </Col>
              <Col>
                <div>{itemModel ? itemModel.item_name : ''}</div>
                <div>{itemModel ? itemModel.series_number : ''}</div>
                <div>{itemModel ? itemModel.item_type : ''}</div>
                <div>{itemModel ? moment(itemModel.item_date_of_birth).format('DD/MM/YYYY') : ''}</div>
                <div>{itemModel ? itemModel.item_place_of_birth : ''}</div>
                <p>
                  หมายเหตุ...
              </p>
              </Col>
            </Row>



          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showModal: false })}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>


    );

  }

}

export default ThemeSwitcher;