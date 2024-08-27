import { createContext } from "react";

const userContext = createContext({
    loggedInUser: "Default Value",
});

export default userContext;   