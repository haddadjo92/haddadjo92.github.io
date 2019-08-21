import React, { Component } from 'react'

class StudentTableHeaders extends Component {
    render() {
        return (
            <React.Fragment>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Date Of Birth</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                    </tr>
                </thead>
            </React.Fragment>
        )
    }
}

export default StudentTableHeaders
