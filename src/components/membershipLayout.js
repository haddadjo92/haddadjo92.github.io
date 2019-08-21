import React, { Component } from 'react'
import FormBackground from './membershipBackground'
import Form from './membershipForm'
import LoginForm from './loginForm';
import SignUpForm from './signupForm';


class membershipLayout extends Component {
    render() {
        return (
            <div className="container-fluid body-content">
                <div id="membership">
                    <div className="membership-col-1">
                        <FormBackground
                            BgURL = "./Images/eSchool--bg.jpg"
                            ClassName="membership-bg"
                        />
                    </div>
                    <div className="membership-col-2">
                        <div className="membership-forms">

                            <Form className="membership-login" headingText="Login" render={() => (
                                <LoginForm />
                            )} />

                            <Form className="membership-SignUp" headingText="Sign Up" render={() => (
                                <SignUpForm />
                            )} />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default membershipLayout