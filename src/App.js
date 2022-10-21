import React from "react";
import Counter from "./components/Counter"
import Google from './components/Google'

const App = () =>{
    return(
        <div className="main">
            <div className="google"><Google/></div>
            <div className="counter"><Counter/></div>
        </div>
    )
}
export default App