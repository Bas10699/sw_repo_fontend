import React, { Component } from 'react'
import { Button, Modal, Col, Form } from 'react-bootstrap';
import swal from 'sweetalert2'

export default class UpdateItemCalender extends Component {
    constructor(props) {
        super(props)
        this.state = {

            dateNow: new Date(),
            date: null,
            time: null,
            detail: null,
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
        console.log(obj)

    }

    render() {
        const { dateNow } = this.state
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
                                    <Form.Control type="date" onChange={this.handleChange} id="cn_date" />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>เวลา</Form.Label>
                                    <Form.Control type="time" onChange={this.handleChange} id="cn_time" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>ชื่ออุปกรณ์</Form.Label>
                                    <Form.Control placeholder="PTZ32W" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>series number</Form.Label>
                                    <Form.Control placeholder="PTZ32W" />
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
