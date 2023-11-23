import { useState } from 'react';
import './App.css';
import CandlestickChart from './Components/Chart';
import Navbar from './Components/Navbar';

function App() {
  const [count,setCount] = useState(0);
  // open ,high , low , close

  return (
    <div className="App">
      <Navbar/>
      <CandlestickChart />
    </div>
  );
}

export default App;
