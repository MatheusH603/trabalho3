const express = require('express');
const router = express.Router();

//importing controllers
const employeeController = require('../controllers/FuncionarioController')

router.get('/list', employeeController.list);
router.post('/create', employeeController.create);
router.get('/get/:id', employeeController.get); 
router.post('/update/:id', employeeController.update);
router.post('/delete', employeeController.delete);
/*
router.get('/datatest', employeeController.testdata);
router.get('/list',employeeController.list );

router.get('/save', (req, res) => {

  res.json({status: "Employeed Saved"});

});
*/

module.exports = router;