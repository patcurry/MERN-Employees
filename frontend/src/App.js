import React from 'react';
import axios from 'axios';

import './App.css';


const SERVER = 'http://localhost:5000';

const IncrementButton = (props) => {

  const handleClick = () => axios.put(`${SERVER}/increment/${props.id}`)
    .then(x => props.updateData());

  return(<button onClick={handleClick}>+</button>); 
};

const DecrementButton = (props) => {

  const handleClick = () => axios.put(`${SERVER}/decrement/${props.id}`)
    .then(x => props.updateData());

  return(<button onClick={handleClick}>-</button>); 
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      employees: []
    }

    this.updateData = this.updateData.bind(this);
  }

  updateData(id) {
    axios.get(SERVER)
      .then(r => r.data)
      .then(d => this.setState({employees: d.employees}));
  }

  componentDidMount() {
    axios.get(SERVER)
      .then(r => r.data)
      .then(d => this.setState({ message: d.message, employees: d.employees }));
  }

  render() {
    return (
      <div className="App">
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
              <th>*</th>
            </tr>
            {
              this.state.employees
                .map(e => 
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.first_name}</td>
                    <td>{e.last_name}</td>
                    <td>Holidays: {e.holidays}</td>
                    <td><IncrementButton id={e.id} updateData={this.updateData} /></td>
                    <td><DecrementButton id={e.id} updateData={this.updateData} /></td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
