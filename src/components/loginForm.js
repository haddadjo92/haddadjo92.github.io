import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import Firebase from '../config/Fire'

import $ from 'jquery';

const HexColor777 = { color: '#777' }
const p_25px_TopBottom = {padding: '25px 0'}

class loginForm extends Component {

    constructor(props) {
        super(props)

        this.UserLogin  = this.UserLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
             Email : '',
             Password : '',
             FireErrors : ''
        }
    }


    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value,
            FireErrors : ''
        })
    }


    UserLogin = e => {
        e.preventDefault()
        Firebase.auth()
        .signInWithEmailAndPassword(this.state.Email,this.state.Password)
        .then((u) =>{}).catch((error) => {
            this.setState({FireErrors: error.message})
        })
    }
    


    ScrollDownFormHandler = () => {
        // console.log("Window_width: " +  $(window).innerWidth() + "  $(window).innerHeight())
        
        var $ViewportWidth = $(window).innerWidth();
        var PageScrolling = 0;
        
        if($ViewportWidth > 1280) PageScrolling = -900 + "px"
        else if($ViewportWidth > 700 && $ViewportWidth <= 1280) PageScrolling = -700 + "px";
        else PageScrolling = -1100 + "px";

        $(".membership-forms").css("transform",`translateY(${PageScrolling})`)  
    }


    render() {

        let errorNotification = this.state.FireErrors ? 
        (<div style={p_25px_TopBottom} id="fireError" className="text-danger">{this.state.FireErrors}</div>) : null;

        return (
            <React.Fragment>
                {errorNotification}                
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor="loginUsername" className="lead">Email</Form.Label>
                        <Form.Control name="Email" type="email" id="loginUsername" onChange={this.handleChange} value={this.state.Email} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="" className="lead">Password</Form.Label>
                        <Form.Control name="Password" type="password" id="loginPassword" autoComplete="true" onChange={this.handleChange} value={this.state.Password} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="toggleCheckbox" id="loginRememberMe">
                            <span className="lead">Remember Me</span>
                            <div className="toggleCheckbox__wrap">
                                <input type="checkbox" />
                                <b className="toggleCheckbox__handle"></b>
                            </div>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <input onClick={this.UserLogin} type="submit" className="btn text-white" value="Login" />
                        <a style={HexColor777} className="btn btn-link float-right font-weight-bold" href="#home">Forget Password</a>
                    </Form.Group>
                </Form>
                <div className="form-scroll-down" onClick={this.ScrollDownFormHandler}>
                    <i className="fa fa-angle-down"></i>
                </div>
            </React.Fragment>
        )
    }
}

export default loginForm
