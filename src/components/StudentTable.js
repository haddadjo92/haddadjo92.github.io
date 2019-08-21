import React, { PureComponent } from 'react'
import Table from 'react-bootstrap/Table'
import TableHeaders from './StudentTableHeaders'
import TableBody from './StudentTableBody'



class StudentTable extends PureComponent {
    render() {
        const {tableOptions} = this.props

        return(
            <React.Fragment>
                <Table className={tableOptions}>
                    <TableHeaders />
                    <TableBody />
                </Table>
            </React.Fragment>
        )
    }

    // GetStudentTableHeaders = () => {
    //     var keys = null
    //     this.data.map(function(item,index){
    //         if(index === 0){ // only one json object keys from array
    //              keys = Object.keys(item)
    //         }

    //         return keys
    //     });

    //     this.setState({
    //         headers : keys
    //     })
    // }
}

export default StudentTable
