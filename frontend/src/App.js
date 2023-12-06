import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './home';
import Login from './login';
import './App.css';
import {useEffect,  useState } from 'react';

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

const App = () => {

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
