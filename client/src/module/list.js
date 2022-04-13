import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      listEmployee:[]
    }
  }

  componentDidMount(){

    this.loadFuncionarios()
  }

  loadFuncionarios(){
    axios.get("http://localhost:3000/funcionarios/list")
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        this.setState({ listEmployee:data });
      }else{
        alert("Error web service")
      }
    })
    .catch(error => {
      alert(error)
    });
  }

  render()
  {
    return (
      <table class="table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Role</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.loadFillData()}
        </tbody>
      </table>
    );
  }

  loadFillData(){

    return this.state.listEmployee.map((data)=>{
      return(
        <tr>
          <th>{data.id}</th>
          <td>{data.role.role}</td>
          <td>{data.nome}</td>
          <td>{data.email}</td>
          <td>{data.endereco}</td>
          <td>{data.telefone}</td>
          <td>
            <Link className='btn btn-outline-info' to={"/edit/"+data.id}>Editar</Link>
          </td>
          <td>
          <button class="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}> Delete </button>
          </td>
        </tr>
      )
    });
  }

  onDelete(id){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Ao excluir, não será possível recuperar os dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado!',
          'error'
        )
      }
    })
  }

  sendDelete(userId)
  {
    // url de backend
    const baseUrl = "http://localhost:3000/funcionarios/delete"    // parameter data post
    // network
    axios.post(baseUrl,{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Excluido!',
          'Cadastro apagado do sistema.',
          'success'
        )
        this.loadFuncionarios()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }
}

export default listComponent;