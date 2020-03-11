import React, { Component } from 'react'
import dateFns from "date-fns";
import './bg.css'
import { Button, Modal, Row, Col, Card, Container } from 'react-bootstrap';
import { get, post } from '../service/service'

import swal from 'sweetalert2'



class profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            data_calernder: [],
            showModal: false,
            showModalAdd: false,
            showModalItem: false,
            dataFilter: []

        };
    }

    componentWillMount() {
        this.get_calender_note()

    }

    get_calender_note = async () => {
        try {
            await get('calender/get_calender_all').then((result) => {
                if (result.success) {
                    this.setState({
                        data_calernder: result.result
                    })
                    this.getDataDate(dateFns.parse(this.state.selectedDate))
                    console.log(result.result)
                }
                else {
                    alert(result.error_message)
                }
            })
        } catch (error) {
            alert('get_calender_note' + error)
        }
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (

            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
            </div>
                </div>
                <div className="col col-center">
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        let data_db = this.state.data_calernder

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;

                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>

                        {data_db.map((element, index) => {
                            // console.log("1dd",dateFns.format(day, "DD/MM/YYYY"))

                            if (dateFns.format(element.cn_date, "DD/MM/YYYY") === dateFns.format(day, "DD/MM/YYYY")) {


                                return <i key={index} className={'fas fa-circle color-' + element.cn_color} />
                                {/* <div className="badge badge-pill badge-secondary">55555</div> */ }


                            }
                        })}
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    getDataDate = (date) => {
        console.log("data", date)
        const dateSearch = dateFns.format(date, "YYYY-MM-DD")

        var updatedList = this.state.data_calernder;
        updatedList = updatedList.filter(function (item) {
            return dateFns.format(item.cn_date, "YYYY-MM-DD").search(dateSearch) !== -1;
        });
        this.setState({
            dataFilter: updatedList,
        });

    }

    onDateClick = day => {
        this.setState({
            selectedDate: day,
            // showModal: true
        });
        this.getDataDate(day)
        window.location.href = "#section2"

    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    alertDelete = data => {
        swal
            .fire({
                title: "คุณแน่ใจไหม?",
                text: "คุณต้องการลบ " + data.cn_head + " หรือไม่?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
            .then(result => {
                console.log(result);
                if (result.value) {
                    this.delete(data);
                }
            });
    };


    delete = async (data) => {
        try {
            const obj = {
                cn_id: data.cn_id
            }
            await post(obj, "calender/delete_canlender").then((result) => {
                if (result.success) {
                    swal
                        .fire({
                            icon: "success",
                            title: "Your data has been deleted.",
                            showConfirmButton: false,
                            timer: 1200
                        })
                        .then(() => {
                            window.location.reload();
                        });
                }
            })
        }
        catch (error) {
            alert("delete: " + error)
        }
    }


    renderModel = () => {
        const background = localStorage.getItem('background')
        const { showModal, selectedDate, dataFilter } = this.state

        return (


            <div class="flip">

                <div class="front">
                    <h4>วันที่ {dateFns.format(selectedDate, "DD/MM/YYYY")}</h4>




                    {dataFilter[0] ?

                        <ul className=" timelineSet b">
                            {dataFilter.map((element, index) => {
                                return <li key={index}>

                                    <div className="b">{element.cn_time}</div>
                                    <button className="btn btn-danger btn-sm float-right" onClick={() => this.alertDelete(element)}>ลบ</button>
                                    <h5>{element.cn_head}</h5>
                                    <p>{element.cn_notes}</p>
                                </li>

                            })}
                        </ul> :
                        <div>ไม่พบรายการ</div>}

                </div>
                <div className="back">
                    <div className={background === 'true' ? "bg-insert2" : ""} fluid={1}> </div>
                </div>
            </div>


        )
    }


    changeshowModalAdd = (status) => {
        this.setState({ showModalAdd: status });
        //fetch a data
        //or update a query to get data
    };

    changeshowModalItem = (status) => {
        this.setState({ showModalItem: status });
        //fetch a data
        //or update a query to get data
    };




    render() {
        return (
            <Row>
               



                <Col>
                    {this.renderModel()}
                </Col>



          
<div class="social-btns"><a class="btn facebook" href="https://www.facebook.com/gagfrom"><i class="fab fa-facebook  fa-3x"  ></i></a><a class="btn google" href="https://www.instagram.com/komet633/"><i class="fab fa-instagram fa-3x"></i></a>
</div>
               
 
            
            </Row>
       
               






        );
    }
}

export default profile;