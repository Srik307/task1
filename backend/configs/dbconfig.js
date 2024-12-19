const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(":memory:");

async function initDB(){
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE IF NOT EXISTS employees 
            (employee_id TEXT PRIMARY KEY,
             name TEXT,
             email TEXT NOT NULL UNIQUE,
             phone_number TEXT NOT NULL,
             department TEXT NOT NULL,
             doj TEXT NOT NULL,
             role TEXT NOT NULL,
             CHECK (email LIKE '%@%.%' AND email NOT LIKE '% %'),
             CHECK (LENGTH(phone_number) = 10 AND phone_number GLOB '[0-9]*')
             )`,
             (err) => {
            if (err) {
                console.error(err.message);
                reject(err.message);
            } else {
                resolve();
            }
        });
    });
}

initDB().then(() => {
    console.log('Database initialized');
}).catch((err) => {
    console.error(err);
});


module.exports = {
    db: db
};