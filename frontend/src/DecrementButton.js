import React from 'react';
import axios from 'axios';

const DecrementButton = (props) => {

  const handleClick = () => axios.put(`http://localhost:5000/decrement/${props.id}`)
    .then(x => props.updateData());

  return(<button onClick={handleClick}>-</button>); 
};

export default DecrementButton;
