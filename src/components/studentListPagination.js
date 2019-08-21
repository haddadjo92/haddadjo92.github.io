import React, { Component } from 'react'
import Pagination from 'react-bootstrap/Pagination'

class studentListPagination extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active : 1,
            items :  [],
        }
    }

    
    componentDidMount = () =>{

        var PaginationItems = []

        for (let number = 1; number <= 1; number++) {
            PaginationItems.push(
                <Pagination.Item key={number} active={number === this.props.activeItem}>
                    {number}
                </Pagination.Item>
            )
        }

        this.setState ({
            active: this.props.activeItem,
            items: PaginationItems
        })

    }

    

    render() {      
  
        const paginationBasic = (
            <React.Fragment>              
                <Pagination>
                    <Pagination.Item><i className="fa fa-chevron-left"></i></Pagination.Item>

                        {this.state.items}
                    
                    <Pagination.Item><i className="fa fa-chevron-right"></i></Pagination.Item>
                </Pagination>
            </React.Fragment>
          )

        return paginationBasic
    }
}

export default studentListPagination
