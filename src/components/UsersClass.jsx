import React from "react";

class UserClass extends React.Component {
    constructor(props) {  
        super(props)
        console.log(this.props.name + " Constructor Called")

        this.state = {
        };
    }
    componentDidMount() {
        console.log(this.props.name + " Child ComponentDidMountCalled");
    }
    render() {
        console.log(this.props.name  + "Child Render")
        const {name, location, contact} = this.props;
        const {count, count2} = this.state;
        return (
            <div className="user-card">
                <h2>Name : {name}</h2>
                <h3>Location : {location}</h3>
                <h4>Contact : {contact}</h4>
            </div>
        );
    }
}

export default UserClass;