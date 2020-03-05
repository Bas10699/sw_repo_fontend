import React, { Component } from 'react'
import { Button, Modal, Col, Form } from 'react-bootstrap';
import { get } from '../../service/service'
import swal from 'sweetalert2'
import dateFns from "date-fns";

export default class UpdateItemCalender extends Component {
    constructor(props) {
        super(props)
        this.state = {

            cn_date: dateFns.format(new Date(), "YYYY-MM-DD"),
            cn_time: dateFns.format(new Date(), "HH:mm"),
            date: null,
            time: null,
            detail: null,
            item_get: [],
            snFilter: [],
            FTSn:false
        }
    }



    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    add_data = async () => {
        const obj = {
            cn_date: this.state.cn_date,
            cn_time: this.state.cn_time,
            cn_notes: this.state.cn_notes,
        }
        swal.fire("GG", "gggggg", "success")
        console.log(obj)

    }

    componentWillMount() {
        this.get_item()
    }

    get_item = async () => {
        try {
            await get("item/get_item_all").then(result => {
                if (result.success) {
                    this.setState({
                        item_get: result.result
                    });
                } else {
                    swal.fire("", result.error_message, "warning");
                }
            });
        } catch (error) {
            alert("get_item_all" + error);
        }
    };

    selectName = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target.value)
        this.get_series(e.target.value)
    }

    get_series = (id) => {
        const dateSearch = id

        var updatedList = this.state.item_get;
        updatedList = updatedList.filter(function (item) {
            return item.item_name.search(dateSearch) !== -1;
        });
        this.setState({
            snFilter: updatedList,
            FTSn:true
        });

    }
    selectSn = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target.value)
        // this.get_series(e.target.value)
    }


    render() {
        const { item_get, snFilter, cn_date, cn_time, FTSn } = this.state
        let showModal = this.props.showModal

        return (
            <div>
                <Modal
                    show={showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                            เพิ่มข้อมูลปฏิทิน
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>วันที่</Form.Label>
                                    <Form.Control type="date" onChange={this.handleChange} id="cn_date" value={cn_date} />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>เวลา</Form.Label>
                                    <Form.Control type="time" onChange={this.handleChange} id="cn_time" value={cn_time} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>ชื่ออุปกรณ์</Form.Label>
                                    <Form.Control as="select" onChange={this.selectName} id="item_name">
                                        {item_get.map((element, index) => {
                                            return <option key={index} >{element.item_name}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>series number</Form.Label>
                                    <Form.Control as="select" onChange={this.selectSn} id="item_series_number">
                                        {FTSn ? snFilter.map((element, index) => {
                                            return <option key={index} value={element.item_id} >{element.item_series_number}</option>
                                        }) : item_get.map((element, index) => {
                                            return <option key={index} value={element.item_id} >{element.item_series_number}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group >
                                <Form.Label>บันทึกรายละเอียด</Form.Label>
                                <Form.Control as="textarea" rows="3" onChange={this.handleChange} id="cn_notes" />
                            </Form.Group>


                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.add_data()} >Submit</Button>
                        <Button variant="danger" onClick={() => this.props.changeshowModalItem(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
