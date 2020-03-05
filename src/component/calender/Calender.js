import React, { Component } from 'react'
import dateFns from "date-fns";
import isEqual from 'date-fns/is_equal'
import isBefore from 'date-fns/is_equal'
import "./Calender.css"
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { get, post } from '../../service/service'
import AddCalender from './AddCalender';
import UpdateItemCalender from './UpdateItemCalender';
import swal from 'sweetalert2'

class Calendar extends Component {
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
            {data_db.map((element) => {
              // console.log("1dd",dateFns.format(day, "DD/MM/YYYY"))

              if (dateFns.format(element.cn_date, "DD/MM/YYYY") === dateFns.format(day, "DD/MM/YYYY")) {
                // console.log("ff",dateFns.format(element.cn_date, "DD/MM/YYYY"))

                return <div >
                  <div className="badge badge-pill badge-success" >0</div>
                  {/* <div className="badge badge-pill badge-secondary">55555</div> */}

                </div>
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

  getDataDate = async (date) => {
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
      showModal: true
    });
    this.getDataDate(day)

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
        text: "คุณต้องการลบ " + data + " หรือไม่?",
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


  delete = (head) => {

  }

  renderModel() {
    const { showModal, selectedDate, dataFilter } = this.state
    return (
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            รายละเอียดวันที่ {dateFns.format(selectedDate, "DD/MM/YYYY")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container mt-5 mb-5">
            <div className="row">
              <div className="col-md-9 offset-md-1">
                <h4>Latest News</h4>
                <ul className="timelineSet">
                  {dataFilter.map((element, index) => {
                    return <li>
                      <a href="#" >{element.cn_time}</a>
                      <button className="btn btn-danger btn-sm float-right" onClick={() => this.alertDelete(element.cn_head)}>ลบ</button>
                      <h5>{element.cn_head}</h5>
                      <p>{element.cn_notes}</p>
                    </li>

                  })}
                </ul>
              </div>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({ showModal: false })}>Close</Button>
        </Modal.Footer>
      </Modal>
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
      <div className="calendar container py-3">
        <Button className=' btn btn-primary' onClick={() => this.setState({ showModalItem: true })}>+item</Button>
        <Button className='float-right btn btn-success' onClick={() => this.setState({ showModalAdd: true })}>+Note</Button>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        {this.renderModel()}
        <AddCalender showModal={this.state.showModalAdd} changeshowModalAdd={this.changeshowModalAdd} />
        <UpdateItemCalender showModal={this.state.showModalItem} changeshowModalItem={this.changeshowModalItem} />
      </div>
    );
  }
}

export default Calendar;

// export default class calender extends Component {

//     render() {
//         return (
//             <div className="container py-5">
//                {/* Calendar */}
//                 <div className="calendar shadow bg-white p-5">
//                     <div className="d-flex align-items-center"><i className="fa fa-calendar fa-3x mr-3" />
//                         <h2 className="month font-weight-bold mb-0 text-uppercase">March 2020</h2>
//                     </div>
//                     <p className="font-italic text-muted mb-5">No events for this day.</p>
//                     <ol className="day-names list-unstyled">
//                         <li className="font-weight-bold text-uppercase">Sun</li>
//                         <li className="font-weight-bold text-uppercase">Mon</li>
//                         <li className="font-weight-bold text-uppercase">Tue</li>
//                         <li className="font-weight-bold text-uppercase">Wed</li>
//                         <li className="font-weight-bold text-uppercase">Thu</li>
//                         <li className="font-weight-bold text-uppercase">Fri</li>
//                         <li className="font-weight-bold text-uppercase">Sat</li>
//                     </ol>
//                     <ol className="days list-unstyled">
//                         <li>
//                             <div className="date rounded-circle bg-danger " style={{width:"23px"}}>&nbsp; 1</div>
//                             <div className="event bg-success">Event with Long Name</div>
//                         </li>
//                         <li>
//                             <div className="date">2</div>
//                         </li>
//                         <li>
//                             <div className="date">3</div>
//                         </li>
//                         <li>
//                             <div className="date">4</div>
//                         </li>
//                         <li>
//                             <div className="date">5</div>
//                         </li>
//                         <li>
//                             <div className="date">6</div>
//                         </li>
//                         <li>
//                             <div className="date">7</div>
//                         </li>
//                         <li>
//                             <div className="date">8</div>
//                         </li>
//                         <li>
//                             <div className="date">9</div>
//                         </li>
//                         <li>
//                             <div className="date">10</div>
//                         </li>
//                         <li>
//                             <div className="date">11</div>
//                         </li>
//                         <li>
//                             <div className="date">12</div>
//                         </li>
//                         <li>
//                             <div className="date">13</div>
//                             <div className="event all-day begin span-2 bg-warning">Event Name</div>
//                         </li>
//                         <li>
//                             <div className="date">14</div>
//                         </li>
//                         <li>
//                             <div className="date">15</div>
//                             <div className="event all-day end bg-success">Event Name</div>
//                         </li>
//                         <li>
//                             <div className="date">16</div>
//                         </li>
//                         <li>
//                             <div className="date">17</div>
//                         </li>
//                         <li>
//                             <div className="date">18</div>
//                         </li>
//                         <li>
//                             <div className="date">19</div>
//                         </li>
//                         <li>
//                             <div className="date">20</div>
//                         </li>
//                         <li>
//                             <div className="date">21</div>
//                             <div className="event bg-primary">Event Name</div>
//                             <div className="event bg-success">Event Name</div>
//                         </li>
//                         <li>
//                             <div className="date">22</div>
//                             <div className="event bg-info">Event with Longer Name</div>
//                         </li>
//                         <li>
//                             <div className="date">23</div>
//                         </li>
//                         <li>
//                             <div className="date">24</div>
//                         </li>
//                         <li>
//                             <div className="date">25</div>
//                         </li>
//                         <li>
//                             <div className="date">26</div>
//                         </li>
//                         <li>
//                             <div className="date">27</div>
//                         </li>
//                         <li>
//                             <div className="date">28</div>
//                         </li>
//                         <li>
//                             <div className="date">29</div>
//                         </li>
//                         <li>
//                             <div className="date">30</div>
//                         </li>
//                         <li>
//                             <div className="date">31</div>
//                         </li>
//                         <li className="outside">
//                             <div className="date">1</div>
//                         </li>
//                         <li className="outside">
//                             <div className="date">2</div>
//                         </li>
//                         <li className="outside">
//                             <div className="date">3</div>
//                         </li>
//                         <li className="outside">
//                             <div className="date">4</div>
//                         </li>
//                     </ol>
//                 </div>
//             </div>

//         )
//     }
// }
