// import { User } from '../User.js'
// import logo from './logo.svg';


import './App.css';
import React from 'react';
import Routes from '../Routes';


const App = () => (
  <div className="App">
    <Routes />
  </div>
);

// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = { apiResponse: "" };
//   }

//   callAPI() {
//       fetch("http://localhost/api")
//           .then(res => res.text())
//           .then(res => { this.setState({ apiResponse: res }); console.log(res)});
//   }

//   componentWillMount() {
//       this.callAPI();
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />          
//           <User />
//         </header>
//       </div>
//     );
//   }
// }

export default App;
