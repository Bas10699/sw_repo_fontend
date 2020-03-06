import React, { Component } from "react";
import { Button, Col, Form, InputGroup, Image, Container, Row, CardDeck, Card } from "react-bootstrap";
import { Formik } from 'formik';
import { post, get } from '../service/service'
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
            item_get_type: [],
            get_data:[],
        }
    }

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }


    componentWillMount() {
        this.get_item_all();
        this.get_item_type()
        this.get_location();
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


    addItem = async () => {
        const obj = {
            item_name: this.state.item_name,
            item_brand: this.state.item_brand,
            item_gen: this.state.item_gen,
            item_type: this.state.selecttype,
            item_series_number: this.state.item_series_number,
            item_date_of_birth: this.state.item_date_of_birth,
            item_place_of_birth: this.state.item_place_of_birth,
            item_status: this.state.item_status,
            item_image: this.state.item_image,


            item_airport: this.state.selectap,
            item_airport_date: this.state.item_airport_date,

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
                    }).then(() => {
                        window.location.href = '/'
                    })

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

    select_ap= e => {


        console.log(e.target.value);
        this.setState({
            selectap: e.target.value
        });
        console.log(this.state.selectap);
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

    render() {

        const { item_image, item_get_type,get_data } = this.state
        // console.log("gg",this.state.item_status)
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
                                                <Form.Label>ชื่ออุปกรณ์</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="item_name"

                                                    onChange={this.handleChange}

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
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
                                                <Form.Control as="select" id="TN_id" onChange={this.select_type}>
                                                    <option >กรุณาเลือกประเภท</option>
                                                    {item_get_type.map((element, index) => {
                                                        return <option value={element.TN_id} key={index}>{element.TN_name}</option>
                                                    })}

                                                </Form.Control>

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



                                            <Form.Group as={Col} md="4" controlId="validationFormik04">
                                                <Form.Label>วันที่นำเข้า</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="item_date_of_birth"
                                                    onChange={this.handleChange}
                                                />
                                                <Form.Control.Feedback type="invalid">

                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="validationFormik05">
                                                <Form.Label>นำเข้าจาก</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="ขโมยมา"
                                                    name="item_place_of_birth"
                                                    onChange={this.handleChange}
                                                />

                                                <Form.Control.Feedback type="invalid">

                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="validationFormik05">
                                                <Form.Label>สถานที่ติดตั้ง</Form.Label>
                                                <Form.Control as="select" id="ap_name" onChange={this.select_ap}>
                                                    <option >กรุณาเลือกสถานที่ติดตั้ง</option>
                                                    {get_data.map((element, index) => {
                                                        return <option value={element.ap_id} key={index}>{element.ap_name}</option>
                                                    })}

                                                </Form.Control>

                                                <Form.Control.Feedback type="invalid">

                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="validationFormik05">
                                                <Form.Label>วันที่ติดตั้ง</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    placeholder="AirportSakon"
                                                    name="item_airport_date"
                                                    id="item_airport_date"
                                                    onChange={this.handleChange}
                                                />

                                                <Form.Control.Feedback type="invalid">

                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationFormik03">

                                                <Form.Label>รูปอุปกรณ์</Form.Label>
                                                <div className="img-resize" >
                                                    <Image src={item_image ? item_image : ImageDefault} rounded />
                                                </div>

                                                <Form.Control
                                                    type="file" onChange={this.uploadpicture}
                                                />

                                                <Form.Control.Feedback type="invalid">

                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="3" controlId="validationFormik05">
                                                <Form.Label>สถานะอุปกรณ์</Form.Label>
                                                <Col sm={10}>
                                                    <Form.Check
                                                        type="radio"
                                                        label="ติดตั้ง"
                                                        name="item_status"
                                                        value="1"
                                                        onChange={this.handleChange}
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        label="พร้อมใช้งาน"
                                                        name="item_status"
                                                        value="2"
                                                        onChange={this.handleChange}
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        label="ส่งซ่อม"
                                                        name="item_status"
                                                        value="3"
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
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
