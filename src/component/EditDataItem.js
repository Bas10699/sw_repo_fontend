import React, { Component } from 'react'
import { Container, Row, Col,  Form,  Image, Button } from 'react-bootstrap'
import ImageDefault from "../const/bg-rias.jpg";
import queryString from 'query-string'
import { post, ip } from '../service/service';
import swal from 'sweetalert2'
import './bg.css'

export default class EditDataItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataedit: ''
        }
    }
    componentWillMount() {
        this.get_item()
    }
    handleChange = (e) => {
        let data = this.state.dataedit
        data[e.target.id] = e.target.value
        this.setState({
            dataedit: data
        })
    }
    get_airport
    get_item = async () => {
        try {

            const url = this.props.location.search;
            const params = queryString.parse(url);
            await post(params, "item/get_item").then((result) => {
                if (result.success) {
                    this.setState({
                        dataedit: result.result
                    })
                    console.log(result.result)
                }
                else {
                    swal.fire("", result.error_message, "error");
                }
            })
        }
        catch (error) {
            alert("get_item: " + error)
        }
    }
    submitData = () => {
        console.log("gg", this.state.dataedit)
    }
    render() {
        return (

            <Container >
                <br />
                <Row>

                    <Col sm={3}>
                        <div className="img-resize">
                            <Image src={ip + this.state.dataedit.item_image} />
                        </div>
                        <input
                            type='file'
                        />

                    </Col>
                    <Col sm={9}>

                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    ชื่ออุปกรณ์
    </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        id="item_name"
                                        value={this.state.dataedit.item_name}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    ยี่ห้อ
    </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        id="item_brand"
                                        value={this.state.dataedit.item_brand}
                                        onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    รุ่น
    </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        id="item_gen"
                                        value={this.state.dataedit.item_gen}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    ซีเรียล
    </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        id="item_series_number"
                                        value={this.state.dataedit.item_series_number}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    สถานที่

    </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="text"
                                        id="item_place_of_birth"
                                        value={this.state.dataedit.item_place_of_birth}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                <Form.Label column sm={1}>
                                    วันที่

    </Form.Label>
                                <Col sm={4}>
                                    <Form.Control
                                        type="date"
                                        id="item_place_of_birth"
                                        value={this.state.dataedit.item_place_of_birth}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    สถานที่นำเข้า

    </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="text"
                                        id="item_place_of_birth"
                                        value={this.state.dataedit.item_place_of_birth}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                <Form.Label column sm={1}>
                                    วันที่

    </Form.Label>
                                <Col sm={4}>
                                    <Form.Control
                                        type="date"
                                        id="item_place_of_birth"
                                        value={this.state.dataedit.item_place_of_birth}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>


                            <fieldset>
                                <Form.Group as={Row}>
                                    <Form.Label as="legend" column sm={2}>
                                        สถานะติดตั้ง
      </Form.Label>
                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="first radio"
                                            id="item_status"
                                            value="1"
                                            checked={this.state.dataedit.item_status == 1}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="second radio"
                                            id="item_status"
                                            value="2"
                                            checked={this.state.dataedit.item_status == 2}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="third radio"
                                            id="item_status"
                                            value="3"
                                            checked={this.state.dataedit.item_status == 3}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>
                            <Form.Group as={Row} controlId="formHorizontalCheck">
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Form.Check label="Remember me" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button onClick={() => this.submitData()}>Sign in</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}
