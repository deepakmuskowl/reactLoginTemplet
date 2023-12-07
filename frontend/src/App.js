import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './home';
import Login from './login';
import './App.css';
import {useEffect, useState } from 'react';

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false)
//   const [ email, setEmail ] = useState("")

//   return (
//     <div className='App'>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
//           <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );

// }



const App = (props) => {

  useEffect(() => {
    //Fetch the user email and token from local storage

    const user = JSON.parse(localStorage.getItem("user"))

    // If the token/email does not exist, mark the user as logged out

    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }

    // If the token exists, verify it with the auth server to see if it is valid

    fetch("http://localhost:3080/varify", {
      method: "POST",
      headers: {
        "jwt-token": user.token
      }
    })

      .then(r => r.json())
      .then(r => {
        props.setLoggedIn('seccess' === r.message)
        props.setEmail(user.email || "")
      })



  },[])

  const [loggedIn, setLoggedIn] = useState(false)
  const [ email, setEmail ] = useState("")


  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
