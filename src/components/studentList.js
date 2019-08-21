import React, { Component } from 'react'
import Table from './StudentTable'
import Pagination from './studentListPagination'
import $ from 'jquery';

class studentList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activePage: 1,
            filter : ''
        }
    }






    componentDidMount() {
        // Responsive Table Optimization
        var $viewportWidth = $(window).innerWidth()

        if ($viewportWidth > 702) $(".studentList").children("table").removeClass("table-responsive")
        else $(".studentList").children("table").addClass("table-responsive")


        $(window).resize(function () {
            if ($(this).innerWidth() > 702) $(".studentList").children("table").removeClass("table-responsive")
            else $(".studentList").children("table").addClass("table-responsive")
        })
    }




    render() {
        
        const { activePage } = this.state
        return (
            <div className="studentList">
                <div className="student-list-header">
                    <h4 className="display-4 text-center">Student List</h4>
                    <input disabled type="search" id="search-students" className="form-control" placeholder="Search Student" />
                </div>
                {/******************************************************/}
                {/******************************************************/}

                <Table tableOptions="table table-striped table-hover lead" />

                {/******************************************************/}
                {/******************************************************/}

                <Pagination activeItem={activePage} />
            </div>
        )
    }
}

export default studentList