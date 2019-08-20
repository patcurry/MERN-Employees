import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

const IncrementButton = ({id}) => {
  const handleClick = () => console.log(`increment ${id}`);
  return(
    <button onClick={handleClick}>+</button>
  ); 
};

const DecrementButton = ({id}) => {
  const handleClick = () => console.log(`decrement ${id}`);
  return(
    <button onClick={handleClick}>-</button>
  ); 
};

const App = () => {
  // set the state variables here
  const [data, setData] = useState({message: '', employees: []});

  // populate the state variables with this function
  useEffect(() => {
    axios.get('http://localhost:5000')
      .then(r => r.data)
      .then(d => setData({ message: d.message, employees: d.employees }));
  }, []);

  return (
    <div className="App">
      {data.message}
      <h2>Employee table</h2>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Holidays</th>
            <th>+</th>
            <th>-</th>
          </tr>
          {
            data.employees
              .map(e => 
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.first_name}</td>
                  <td>{e.last_name}</td>
                  <td>Holidays: {e.holidays}</td>
                  <td><IncrementButton id={e.id} /></td>
                  <td><DecrementButton id={e.id} /></td>
                </tr>
              )
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
