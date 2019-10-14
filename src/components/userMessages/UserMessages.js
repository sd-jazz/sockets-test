import React, { Component } from "react";

class UserMessages extends Component {
    constructor(props){
        super(props)
        this.state = {
            userMessages: []
        }
    }

    render(){
        return(
            <div>USER MESSAGES</div>
        )
    }
}

export default UserMessages