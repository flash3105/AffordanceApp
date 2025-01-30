
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Food from './pages/Food';
import Transport from './pages/Transport';
import Hotels from './pages/Hotels';
import Entertainment from './pages/Entertainment';
import Grocery from './pages/Grocery';

function App() {
  return (
    <Router>
    <div className="App">
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/food" element={<Food/>}/>
        <Route path="/transport" element={<Transport/>}/>
        <Route path="/hotels" element={<Hotels/>}/>
        <Route path="/entertainment" element={<Entertainment/>}/>
        <Route path="/grocery" element={<Grocery/>}/>
     </Routes>
       
    </div>
    </Router>
  );
};

export default App;
