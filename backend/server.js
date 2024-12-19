const express=require('express');
const app=express();
const port=8080;
const EmployeesRouter=require('./routers/Employees/router.js')
const cors=require('cors');

const {db}=require('./configs/dbconfig.js');


// app.use(cors(['http://localhost:3000']));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow custom headers
    next();
});

app.use(express.json());

app.get('/employees', (req, res) => {
    db.all("SELECT * FROM employees", (err, rows) => {
        if (err) {
        console.error(err.message);
        res.status(500).send(err.message);
        } else {
        res.json(rows);
        }
    });
});  //test


app.use('/employees',EmployeesRouter)






app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



