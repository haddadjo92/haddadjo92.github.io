import React, { Component } from 'react'


class membershipBackground extends Component {

    render() {
        const {BgURL,ClassName} = this.props
        const InlineBg = {backgroundImage: `url(${BgURL})`}

        return (
            <div className={ClassName} style={InlineBg}></div>
        )
    }
}




export default membershipBackground
