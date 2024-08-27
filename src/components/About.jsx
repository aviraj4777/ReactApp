// rafce -> snippet for Component
import userContext from "../utils/UserContext";

import User from "./Users";
import UserClass from "./UsersClass";
import { Component } from "react";

class About extends Component {
  constructor(props) {
    // console.log("Parent Constructor Called");
    super(props);
  }
  componentDidMount() {
    console.log("Parent ComponentDidMountCalled");
    // This componentDidMount is used to do API Call.
  }
  render() {
    console.log("Parent Render");
    return (
      <div>
        <h1>About Us</h1>
        {/* Class Based Component doesn't have hooks. So, it uses a different method to use the context data */}
        <userContext.Consumer>
          {({loggedInUser}) => <h1 className="text-lg font-bold">{loggedInUser}</h1>}
        </userContext.Consumer>
        <UserClass
          name={"Aviraj Kumar (class)"}
          location={"punjab"}
          contact={"@aviraj4777"}
        />

      </div>
    );
  }
}

export default About;
