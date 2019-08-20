import React from 'react';
import axios from 'axios';

import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';

import './App.css';


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
    axios.get('http://localhost:5000')
      .then(r => r.data)
      .then(d => this.setState({employees: d.employees}));
  }

  componentDidMount() {
    axios.get('http://localhost:5000')
      .then(r => r.data)
      .then(d => this.setState({ message: d.message, employees: d.employees }));
  }

  render() {
    return (
      <div className='App'>
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
