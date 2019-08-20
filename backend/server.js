const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

const mockData = {
  message: 'This is a fake data table. Soon this will pull from a Mongo database.',
  employees: [
    {
      id: 1,
      first_name: 'Steve',
      last_name: 'Hwang',
      holidays: 30
    },
    {
      id: 2,
      first_name: 'Max',
      last_name: 'Power',
      holidays: 30
    },
    {
      id: 3,
      first_name: 'Jessica',
      last_name: 'Jones',
      holidays: 30
    },
    {
      id: 4,
      first_name: 'Jamie',
      last_name: 'Curtis',
      holidays: 30
    }
  ]
};

app.use(cors());

app.get('/', (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`);
  res.json(mockData);
});

// increment holidays
app.put('/increment/:id', (req, res, next) => {
  // log the request
  console.info(`${req.method} ${req.originalUrl}`);

  // increment the holidays by 1
  // I don't like this code, but it works
  mockData.employees
    .filter(e => e.id === parseInt(req.params.id))
    .map(e => e.holidays += 1);

  // response - is this necessary?
  res.json({message: `Incremented user ${req.params.id}`});
});

// decrement holidays
app.put('/decrement/:id', (req, res, next) => {
  // log the request
  console.info(`${req.method} ${req.originalUrl}`);

  // decrement the holidays by 1
  // I don't like this code, but it works
  mockData.employees
    .filter(e => e.id === parseInt(req.params.id))
    .map(e => e.holidays -= 1);

  // response - is this necessary?
  res.json({message: `Decremented user ${req.params.id}`});
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}.`));
