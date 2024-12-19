const { v4: uuidv4 } = require('uuid'); 

async function generateID(){
    return uuidv4();
}

module.exports = {
    generateID: generateID
};