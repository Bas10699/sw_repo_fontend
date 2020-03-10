import React, { Component } from 'react'
import { Container, Row} from 'react-bootstrap'
import swal from 'sweetalert'
import { get } from '../service/service'

export default class ShowAirport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            airport_all: [],
            airport_all_origin: []
        }
    }
    componentWillMount() {
        this.get_airport()
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


            </Container >
        )
    }
}
