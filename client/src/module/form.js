import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'

class EditComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      campNome: "",
      campEmail:"",
      campTelefone:"",
      campEndereco:"",
      selectRole:0
    }
  }

  render(){
    return (
      <div>
        <div class="form-row justify-content-center">
          <div class="form-group col-md-6">
            <label for="inputPassword4">Nome </label>
            <input type="text" class="form-control"  placeholder="Name" value={this.state.campNome} onChange={(value)=> this.setState({campNome:value.target.value})}/>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control"  placeholder="Email" value={this.state.campEmail} onChange={(value)=> this.setState({campEmail:value.target.value})}/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputState">Função</label>
            <select id="inputState" class="form-control" onChange={(value)=> this.setState({selectRole:value.target.value})}>
              <option selected>Choose...</option>
              <option value="1">Admin...</option>
              <option value="2">Funcionario</option>
              <option value="3">Tecnico</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Telefone</label>
            <input type="number" class="form-control"  placeholder="Phone"  value={this.state.campTelefone} onChange={(value)=> this.setState({campTelefone:value.target.value})}/>
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Endereço</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" value={this.state.campEndereco} onChange={(value)=> this.setState({campEndereco:value.target.value})}/>
        </div>
        <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Save</button>
      </div>
    );
  }

  sendSave(){

    if (this.state.selectRole===0) {
      alert("Selecione uma função antes")
    }
    else if (this.state.campTelefone==="") {
       alert("Campo telefone é obrigatório")
    }
    else if (this.state.campNome==="") {
       alert("Campo nome é obrigatório")
    }
    else if (this.state.campEmail==="") {
       alert("Campo email é obrigatório")
    }
    else if (this.state.campEndereco==="") {
       alert("Campo endereço é obrigatório")
    }
    else {
 
      const baseUrl = "http://localhost:3000/funcionarios/create"
 
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
          alert(response.data.message)
        }
      }).catch(error=>{
        alert("Error 34 "+error)
      })
 
    }
 
  }
}


export default EditComponent;