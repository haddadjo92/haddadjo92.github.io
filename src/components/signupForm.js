import React, { Component } from 'react'
import Firebase from '../config/Fire'
import DatePicker from 'react-date-picker'
import { Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import $ from 'jquery'
import swal from 'sweetalert'



const p_25px = {padding : "25px 0"}
const initialState = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    FirstName: '',
    MiddleName: '',
    LastName: '',
    date: new Date(),
    Gender: false,
    SignUpErrors: [],
};


class signupForm extends Component {
    constructor(props) {
        super(props)
        this.state = initialState

        this.handleChange = this.handleChange.bind(this)
        this.UserSignUp = this.UserSignUp.bind(this)

    }


    handleChange = e => {
        // console.log( "Target Name: " + [e.target.name] + "target value: " + e.target.value)
        $("#fireError").empty()

        this.setState({
            [e.target.name]: e.target.value,
            SignUpErrors: []
        });
    }


    validate = () => {
        let ErrorCollection = []

        if (!this.state.FirstName) ErrorCollection.push("First Name is Required.")
        if (!this.state.LastName) ErrorCollection.push("Last Name is Required.")
        if (!this.state.Email.includes("@")) ErrorCollection.push("Invalid Email Address.")
        if (!this.state.Password) ErrorCollection.push("Password is Required.")
        if (!this.state.ConfirmPassword) ErrorCollection.push("Confirm Password is Required.")
        if (this.state.Password !== this.state.ConfirmPassword) ErrorCollection.push("Password Mismatch.")
        
        if (ErrorCollection.length > 0) {
            this.setState({ SignUpErrors: ErrorCollection });
            return false;
        }

        return true;
    };




    UserSignUp = e => {
        e.preventDefault()
        $("#fireError").empty()

        // Sign Up Form Validation
        const IsValid = this.validate();
        if (IsValid) {
            // Post a new record of details into `Student` Collection            
            fetch('https://us-central1-eschooldemo-2b247.cloudfunctions.net/AddNewStudent', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json charset=utf-8',
                },
                body: JSON.stringify({
                    ID: Math.round(100 + (Math.random() * (9999999999999999999999999))),
                    FirstName: this.state.FirstName,
                    MiddleName: this.state.MiddleName,
                    LastName: this.state.LastName,
                    DateOfBirth: this.state.DateOfBirth,
                    Gender: this.state.Gender,
                    Email: this.state.Email,
                    Password: this.state.Password,
                })
            }).then(response => {
                // Hide all warnings
                this.setState({initialState});
                this.setState({SignUpErrors : []})
                // Create User With Email And Password
                Firebase.auth()
                    .createUserWithEmailAndPassword(this.state.Email, this.state.Password)
                    .catch((error) => {
                        swal(":(", "An error has occurred while Creating user", "error");
                    })

                swal("Thank You", "Student has been recorded successfully", "success")
            }).catch(error => {
                swal("An error has occurred!", String(error), "error");
                console.log(error)
            })
        }
    }



    datepickerHandler = date => { $("#fireError").empty(); this.setState({ date }) }
    ScrollUpFormHandler = () => document.getElementsByClassName("membership-forms")[0].style.transform = "translateY(0px)"

    render() {
        return (
            <React.Fragment>
                <div style={p_25px} id="fireError" className="text-danger"></div>
                {
                    this.state.SignUpErrors.forEach(error => {
                        $("#fireError").append(`<p style="margin-bottom : 0.25rem !important">${error}</p>`)
                    })
                }

                <Form onSubmit={this.UserSignUp}>
                    <Row>
                        <Form.Group className="col-sm">
                            <Form.Label htmlFor="SignUp-fname" className="lead">First Name</Form.Label>
                            <Form.Control name="FirstName" type="text" id="SignUp-fname" value={this.state.FirstName} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="col-sm">
                            <Form.Label htmlFor="SignUp-mname" className="lead">Middle Name</Form.Label>
                            <Form.Control name="MiddleName" type="text" id="SignUp-mname" value={this.state.MiddleName} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="col-sm">
                            <Form.Label htmlFor="SignUp-lname" className="lead">Last Name</Form.Label>
                            <Form.Control name="LastName" type="text" id="SignUp-lname" value={this.state.LastName} onChange={this.handleChange} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="col-sm">
                            <Form.Label htmlFor="datepicker" className="lead" >Date Of Birth</Form.Label>

                            <DatePicker
                                name="date"
                                dateFormat="yyyy/MM/dd"
                                value={this.state.date}
                                onChange={this.datepickerHandler}
                                required={true} />

                        </Form.Group>
                        <Form.Group className="col-sm" id="SignUp-Gender">
                            <Form.Label className="lead">Gender</Form.Label>

                            <Form.Label className="toggleCheckbox">
                                <div className="toggleCheckbox__wrap">
                                    <input type="checkbox" id="SignUpGender" name="Gender" value={this.state.Gender} onChange={this.handleChange} />
                                    <b className="toggleCheckbox__handle"></b>
                                </div>
                            </Form.Label>
                        </Form.Group>
                    </Row>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="SignUp-Username" className="lead">Email</Form.Label>
                        <Form.Control name="Email" type="email" id="SignUp-Username" value={this.state.Email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="SignUp-Password" className="lead">Password</Form.Label>
                        <Form.Control name="Password" type="password" id="SignUp-Password" autoComplete="false" value={this.state.Password} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="SignUp-ConfirmPass" className="lead">Confirm Password</Form.Label>
                        <Form.Control name="ConfirmPassword" type="password" id="SignUp-ConfirmPass" autoComplete="false" value={this.state.ConfirmPassword} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <input type="submit" className="btn text-white" value="Register" />
                    </Form.Group>
                </Form>


                <div className="form-scroll-up" onClick={this.ScrollUpFormHandler}>
                    <i className="fa fa-angle-up"></i>
                </div>
            </React.Fragment>
        )
    }
}

export default signupForm