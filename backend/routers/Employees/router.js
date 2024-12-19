const express=require('express');
const router=express.Router();
const getEmployeesHandler=require('./getEmployeesHandler.js');
const postEmployeesHandler=require('./postEmployeesHandler.js');

router.use('/get/all',getEmployeesHandler.getAll);
router.post('/post/add',postEmployeesHandler.add);

module.exports=router;