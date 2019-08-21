import React, { Component } from 'react'
import firebase from '../config/Fire'

class StudentTableBody extends Component {

    constructor(props) {
        super(props)

        this.state = {
            studentRecords: [],
        }
    }

    componentDidMount() {
        this.GetAllStudents();
    }

    GetAllStudents = () => {
        firebase
            .firestore().collection("Student").get()
            .then(querySnapshot => {
                this.setState({ studentRecords: querySnapshot.docs.map(doc => doc.data()) })
            })
    }



    render() {
        return (
            <tbody>
                {
                    this.state.studentRecords.map(function (item, index) {
                        return (
                            <tr key={item.ID}>
                                <th>{item.ID}</th>
                                <td>{item.FirstName + " " + item.LastName}</td>
                                <td>{item.DateOfBirth}</td>
                                <td>{item.Gender === true ? "Male" : "Female"}</td>
                                <td>{item.Email}</td>
                                <td>{item.Password}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        )
    }
}

export default StudentTableBody





