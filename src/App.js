import { useState } from 'react';
import './App.css';
import CandlestickChart from './Components/Chart';
import Navbar from './Components/Navbar';
import GuideModal from './Components/GuideModal';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <CandlestickChart />
      <GuideModal />
    </div>
  );
}

export default App;
