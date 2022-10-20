import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const HeadingComponentUsingFunction = () => {
  return <h1>Heading 1 using functional Component</h1>
}

class HeadingComponentUsingClass extends React.Component{
  render(){
    return <h2>Heading 2 using Cal Component <CurrentTime/> </h2>
  }
}

const CurrentTime = () => {
  return <p> {+new Date()} </p>
}

const SubHeadingComponentUsingFunction = (props) => {
  return <h3>{props.title}</h3>
}

class SubHeadingComponentUsingClass extends React.Component{
  render(){
    return <h3>{this.props.title}</h3>
  }
}

setInterval(()=>{
  root.render(<React.StrictMode>
    <HeadingComponentUsingFunction />
    <HeadingComponentUsingClass/>
    <SubHeadingComponentUsingFunction title="It is sub heading using function" count="2"/> 
    <SubHeadingComponentUsingClass title="It is sub heading using class"/> 
  </React.StrictMode>);
},1000)
