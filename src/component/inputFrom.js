import React, { Component } from "react";
import { Button, Col, Form, InputGroup, Image, Container, Row, CardDeck, Card } from "react-bootstrap";
import { Formik } from 'formik';
import { post } from '../service/service'
import swal from 'sweetalert2'
import ImageDefault from '../const/images.png'
// const { Formik } = formik;

// const schema = yup.object({
//     firstName: yup.string().required(),
//     lastName: yup.string().required(),
//     username: yup.string().required(),
//     city: yup.string().required(),
//     state: yup.string().required(),
//     zip: yup.string().required(),
//     terms: yup.bool().required(),
// });

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            item_image: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addItem = async () => {
        const obj = {
            item_name: this.state.item_name,
            item_type: this.state.item_type,
            item_series_number: this.state.item_series_number,
            item_date_of_birth: this.state.item_date_of_birth,
            item_place_of_birth: this.state.item_place_of_birth,
            item_image: this.state.item_image
        }
        console.log(obj)
        try {
            await post(obj, 'item/add_item').then((result) => {
                if (result.success) {
                    swal.fire({
                        icon: 'success',
                        title: 'ลงทะเบียนอุปกรณ์เรียบร้อย',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    window.location.href = '/'
                }
                else {
                    swal.fire("", result.error_message, "error");
                }
            })
        }
        catch (error) {
            alert('addItem' + error)
        }
    }

    uploadpicture = (e) => {

        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {

        } else {
            reader.readAsDataURL(file)

            reader.onloadend = () => {
                console.log("img", reader.result)
                this.setState({
                    item_image: reader.result
                });
            }
        }

    }

    render() {

        const { item_image } = this.state

        return (
            <Container fluid="true">
                <br />
                <Row>
                    <Col sm={2}>
                    </Col>
                    <Col>
                        <CardDeck>
                            <Card border="info">
                                <Card.Body>
                                    <Form noValidate >
                                        <Form.Row>
                                            <Form.Group as={Col} md="4" controlId="validationFormik01">
                                                <Form.Label>ยี่ห้อ</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="item_brand"
                                                    onChange={this.handleChange}

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="validationFormik01">
                                                <Form.Label>รุ่น</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="item_gen"
                                                    onChange={this.handleChange}

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="validationFormik02">
                                                <Form.Label>ประเภท</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="item_type"
                                                    onChange={this.handleChange}
                                                />

                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                                                <Form.Label>Series Number</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="inputGroupPrepend">S/N</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder=""
                                                        aria-describedby="inputGroupPrepend"
                                                        name="item_series_number"
                                                        onChange={this.handleChange}
                                                    />
                                                    <Form.Control.Feedback type="invalid">

                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationFormik03">

                                                <Form.Label></Form.Label>
                                                <div className="img-resize">
                                                    <Image src={item_image ? item_image : ImageDefault} rounded />
                                                </div>

                                                <Form.Control
                                                    type="file" onChange={this.uploadpicture}
                                                />

                                                <Form.Control.Feedback type="invalid">

                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="3" controlId="validationFormik04">
                                                <Form.Label>วันเกิด</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="item_date_of_birth"
                                                    onChange={this.handleChange}
                                                />
                                                <Form.Control.Feedback type="invalid">

                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="3" controlId="validationFormik05">
                                                <Form.Label>สถานที่</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="ขโมยมา"
                                                    name="item_place_of_birth"
                                                    onChange={this.handleChange}
                                                />

                                                <Form.Control.Feedback type="invalid">

                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>

                                        <Button className='float-right' onClick={() => this.addItem()}>ลงทะเบียน</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </Col>
                    <Col sm={2}>
                    </Col>
                </Row>
            </Container>

        );
    }


}

export default UserProfile;
