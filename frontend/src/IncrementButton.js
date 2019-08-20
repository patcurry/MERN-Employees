import React from 'react';
import axios from 'axios';

const IncrementButton = (props) => {

  const handleClick = () => axios.put(`http://localhost:5000/increment/${props.id}`)
    .then(x => props.updateData());

  return(<button onClick={handleClick}>+</button>); 
};

export default IncrementButton;
