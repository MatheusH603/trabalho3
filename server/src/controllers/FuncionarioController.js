const controller = {}

var Employee = require('../model/Funcionario');
var Role = require('../model/Role');
var sequelize = require('../model/database');

/*
controller.testdata = async (req, res) => {
    /*
    //Create role
    Role.create({
        role: 'Admin',role: 'Funcionario',role: 'Tecnico'
    });

    // create employee
    Employee.create({
        nome: 'Malena Morgan',
        email: 'malena@mail.com',
        endereco: 'California Cll 108',
        telefone: '123456789',
        roleId: 1
    });
    

    const response = await sequelize.sync().then(function () {
        const data = Employee.findAll() //pega todos os funcionarios
        return data;
    }).catch(error => {
        return error;
    })

    res.json(response);
    /*
  const data = {
    nome: "Jhon Smith",
    age: 20,
    city: 'London'
  }

  console.log("Send data from controller employee");
  res.json(data);
    
};
*/

controller.list = async (req, res) => {

  const data = await Employee.findAll({
      include: [Role]
    })
    .then(function (data) {
      return data;
    })
    .catch(error => {
      return error;
    });

  res.json({
    success: true,
    data: data
  });

}

controller.create = async (req, res) => {
  // data
  const {
    nome,
    email,
    endereco,
    telefone,
    role
  } = req.body;
  // create
  const data = await Employee.create({
      nome: nome,
      email: email,
      endereco: endereco,
      telefone: telefone,
      roleId: role
    })
    .then(function (data) {
      return data;
    })
    .catch(error => {
      console.log("Errorazo " + error)
      return error;
    })
  // return res
  res.status(200).json({
    success: true,
    message: "Salvo com sucesso",
    data: data
  });
}

controller.get = async (req,res) => {
  const { id } = req.params;
  const data = await Employee.findAll({
      where: { id: id },
      include: [ Role ]
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  
  res.json({ success: true, data: data });
}

controller.update = async (req,res) => {
  // parameter get id
  const { id } = req.params;
  // parameter POST
  const {nome, email, endereco, telefone, role } = req.body;
  // Update data
  const data = await Employee.update({
    nome:nome,
    email:email,
    endereco:endereco,
    telefone:telefone,
    roleId:role
  },
  {
    where: { id: id}
  })
  .then( function(data){
    return data;
  })
  .catch(error => {
    return error;
  }) 
  res.json({success:true, data:data, message:"Atualizado com sucesso!"});
}

controller.delete = async (req, res) => {
  // parameter post
  const { id } = req.body;
  // delete sequelize
  const del = await Employee.destroy({
    where: { id: id}
  })
  res.json({success:true,deleted:del,message:"Deletado com sucesso!"});
}

module.exports = controller;