import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
const baseUrl = "http://localhost:3000"

class EditComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dataEmployee:{},
      campNome: "",
      campEmail:"",
      campTelefone:"",
      campEndereco:"",
      stringRole:"",
      selectRole:0
    }
  }

  componentDidMount(){
    let userId = this.props.match.params.id;
    const url = baseUrl+"/funcionarios/get/"+userId
    axios.get(url)
    .then(res => {
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataEmployee: data,
          campNome: data.nome,
          campEmail: data.email,
          campTelefone: data.telefone,
          campEndereco: data.endereco,
          stringRole: data.role.role,
          selectRole: data.roleId
        })
        console.log(JSON.stringify(data.role.role))
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }


  render(){
    return (
      <div>
        <div class="form-row justify-content-center">
          <div class="form-group col-md-6">
            <label for="inputPassword4">Nome</label>
            <input type="text" class="form-control"  placeholder="Name"
              value={this.state.campNome} onChange={(value)=> this.setState({campNome:value.target.value})}/>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control"  placeholder="Email"
              value={this.state.campEmail} onChange={(value)=> this.setState({campEmail:value.target.value})}/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputState">Função</label>
            <select id="inputState" class="form-control" onChange={(value)=> this.setState({selectRole:value.target.value})}>
              <option selected value={this.state.dataEmployee.roleId}>{this.state.stringRole}</option>
              <option value="1">Admin</option>
              <option value="2">Funcionario</option>
              <option value="3">Tecnico</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Telefone</label>
            <input type="number" class="form-control"  placeholder="Phone"
              value={this.state.campTelefone} onChange={(value)=> this.setState({campTelefone:value.target.value})}/>
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Endereço</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"
            value={this.state.campEndereco} onChange={(value)=> this.setState({campEndereco:value.target.value})}/>
        </div> 
        <button type="submit" class="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
      </div>
    );
  }

  sendUpdate(){
    //  get parameter id
    let userId = this.props.match.params.id;
    // url de backend
    const baseUrl = "http://localhost:3000/funcionarios/update/"+userId
    // parametros de datos post
    const datapost = {
      nome : this.state.campNome,
      email : this.state.campEmail,
      telefone : this.state.campTelefone,
      endereco : this.state.campEndereco,
      role  : this.state.selectRole
    }

    axios.post(baseUrl,datapost)
    .then(response=>{
      if (response.data.success===true) {
        alert(response.data.message)
      }
      else {
        alert("Error")
      }
    }).catch(error=>{
      alert("Error 34 "+error)
    })

   }
}


export default EditComponent;