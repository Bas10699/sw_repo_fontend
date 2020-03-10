import React, { Component } from "react";
import { ProgressBar, Button, Col, Form, InputGroup, Image, Container, Row, CardDeck, Card } from "react-bootstrap";
import { Formik } from 'formik';
import { post, get } from '../service/service'
import swal from 'sweetalert2'
class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            item_image: null,
            item_get_type: [],
            get_data: [],
            

        }
    }
      
     render() {

        const { item_image, item_get_type, get_data } = this.state
        // console.log("gg",this.state.item_status)
        return (
 <div>
     
 </div>
        );
    }


}

export default UserProfile;
