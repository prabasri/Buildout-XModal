import { useEffect, useState } from 'react';
import Modal from './Modal/Modal';
import './App.css';

function App() {

  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible(true);
  }

  console.log(isVisible);

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={handleVisibility}>Open Form</button>
      <Modal visibility={isVisible} setVisibility={setIsVisible}/>
    </div>
  );
}

export default App;
