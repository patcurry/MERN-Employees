const express = require('express');
const cors = require('cors');

// should this be in another file?
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/employee_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log("We're connected!") });

// employee model
const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  holidays: Number
});

// make model
const Employee = mongoose.model('Employee', employeeSchema);

// make seeds for database
const steveHwang = new Employee({ firstName: 'Steve', lastName: 'Hwang', holidays: 30 });
const jessicaJones = new Employee({ firstName: 'Jessica', lastName: 'Jones', holidays: 30 });
const maxPower = new Employee({ firstName: 'Max', lastName: 'Power', holidays: 30 });
const jamieCurtis = new Employee({ firstName: 'Jamie', lastName: 'Curtis', holidays: 30 });

// if database is not already populated then seed it
const seeds = [steveHwang, jessicaJones, maxPower, jamieCurtis];

// this actually works!
function createJustOneEmployee(employee) {
  Employee.deleteMany({firstName: employee.firstName}, (err, data) => {
    return err ? console.log(err) : data;
  });

  const update = {useFindAndModify: false};
  const options = {upsert: true, new: true, setDefaultsOnInsert: true };

  Employee.findOneAndUpdate(
    { 
      firstName: employee.firstName,
      lastName: employee.lastName, 
      holidays: employee.holidays 
    }, update, options, (err, employees) => {
    if (err) return;
  });
}

seeds.forEach(e => createJustOneEmployee(e) );

const app = express();
const PORT = 5000;

/*
const mockData = {
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
*/

app.use(cors());

app.get('/', (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`);
  //res.json(mockData);

  Employee.find({}, (err, employees) => {
    res.send(employees)
    /*
    const employeeMap = {};

    employees.forEach(employee => {
      console.log(employee);
      employeeMap[employee._id] = employee;
    });

    res.send(employeeMap)
    */
  })

});

// increment holidays
app.put('/increment/:id', (req, res, next) => {
  // log the request
  console.info(`${req.method} ${req.originalUrl}`);
  console.log(req.params.id)

  Employee.findByIdAndUpdate(
    {_id: req.params.id},
    {$inc: {holidays: 1}},
    (err, res) => {
      if (err) console.log(err);
      res.send('success!');
    }
  )

  // increment the holidays by 1
  // I don't like this code, but it works
  /*
  mockData.employees
    .filter(e => e.id === parseInt(req.params.id))
    .map(e => e.holidays += 1);

  // response - is this necessary?
  res.json({message: `Incremented user ${req.params.id}`});
  */
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
