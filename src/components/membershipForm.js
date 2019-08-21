import React, { Component } from 'react'


class membershipForm extends Component {

    render() {

        const {className,headingText} = this.props

        return (
            <div className={className}>
                <h1 className="text-center display-4 formHeading">{headingText}</h1>
                {this.props.render()}
            </div>
        )
    }
}


export default membershipForm
