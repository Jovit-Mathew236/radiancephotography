import './App.css';
// import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";


// import Form from "./components/Form";
// import Venture from './components/Venture';
// import Techquiz from './components/Techquiz';
// import Techwrite from './components/Techwrite';
// import Treahunt from './components/Treahunt';
// import Riddle from './components/Riddle';
import Photography from './components/Photography';
// import Head from './components/head';
// import Header from './components/Header';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes >
          {/* <Route exact path='HACK-IT-ON/' element={<Form/>} />
          <Route path='HACK-IT-ON/dash' element={<Dashboard/>} />
          <Route path='mech/venture' element={<Venture />} />
          <Route path='mech/techquiz' element={<Techquiz />} />
          <Route path='mech/techwrite' element={<Techwrite />} />
          <Route path='civil/onlinetreasurehunt' element={<Treahunt />} />
          <Route path='eee/riddle' element={<Riddle />} /> */}
          <Route exact path='/radiancephotography' element={<Photography />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
