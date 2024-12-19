const {db} = require('../../configs/dbconfig.js')
const {resgen}=require('../../utils/responsegenerator.js')

const {generateID}=require('./../../utils/idgenerator.js');

async function add(req, res) {
    try {
        const data = req.body;

        await new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO employees (employee_id, name, email, phone_number, department, doj, role) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [data.employee_id, data.name, data.email, data.phone_number, data.department, data.doj, data.role],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this);
                    }
                }
            );
        });
        resgen(res, 200, "Data received", data);
    } catch (err) {
        if (err.code === "SQLITE_CONSTRAINT" && err.message.includes("email")) {
            return resgen(res, 400, "Email already exists", null);
        }
        if(err.code === "SQLITE_CONSTRAINT" && err.message.includes("employee_id")){
            return resgen(res, 400, "Employee ID already exists", null);
        }
        resgen(res, 500, "Internal Server Error", null);
    }
}

module.exports={
    add:add
}