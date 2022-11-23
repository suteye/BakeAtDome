const express = require('express');
const {getEmployees,addEmployees,getEmployeesById,deleteEmployees,updateEmployees} = require('../controllers/EmployeeController');

const router = express.Router();

router.get('/getEmployees',getEmployees);
router.post('/addEmployees',addEmployees);
router.put('/updateEmployees',updateEmployees);
router.post('/deleteEmployees',deleteEmployees);

module.exports = router;