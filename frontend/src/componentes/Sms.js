import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Estilos.css";
import { Dropdown } from "reactstrap";
import micalro from '../assets/Claro.svg'
import CryptoJS from 'crypto-js'


/* This is a higher order component that
 *  inject a special prop   to our component.
 */
function withParams(Component) {
  return (props) => (
    <Component {...props} params={useParams()} navigate={useNavigate()} location={useLocation()} />
  );
}

class Crear extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      phones:[],
      phone:"",
      message:"",
      hora:""
  }
  }
  componentDidMount(){
    const hoy = new Date();
    this.setState({phones:[{id:1,phone:"3208654121"},{id:2,phone:"3208654122"},{id:3,phone:"3208654123"}]});
    this.state.hora= hoy.getHours() + ':' + hoy.getMinutes();
    this.state.hora= hoy.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  enviarDatos=(e)=>{
    e.preventDefault();

    document.getElementById("cardfooter").style.display='none';
    document.getElementById('phone').disabled = true;
    document.getElementById("messagesent").style.display='block';

  }
  cambioValor=(e)=>{
    const state=this.state;
    state[e.target.name]=e.target.value;
    this.setState({state});
  }
  render() {
    const{phone,message,phones}=this.state
    return (
        
        <div className="container mt-4">
          <div className="card mx-auto">
          <form onSubmit={this.enviarDatos}>
            <div className="card-header bg-transparent">
              <div className="navbar navbar-expand p-0">

                <select className="form-control" name="phone" id="phone" value={phone} onChange={this.cambioValor} >
                {phones.map(
                  (phon)=>(
                      <option key={phon.id}>{phon.phone}</option>
                  )
                )}
                  
                </select>
              </div>
            </div>
            <div
              className="card-body p-4"
              style={{ height: "400px", overflow: "auto" }}
            >
              <div id="messagesent" style={{display:"none"}}>
                <div className="d-flex align-items-baseline text-end justify-content-end mb-4" >
                  <div className="pe-2"  >
                    <div>
                      <div className="card card-text d-inline-block p-2 px-3 m-1">
                        {message}
                      </div>
                    </div>
                    <div>
                      <div className="small">{this.state.hora}</div>
                    </div>
                  </div>
                  <div className="position-relative avatar" >
                    <img
                      src={micalro}
                      className="img-fluid rounded-circle"
                      alt=""
                    />
                    <span className="position-absolute bottom-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div id="cardfooter" className="card-footer bg-white position-absolute w-100 bottom-0 m-0 p-1">
              <div className="input-group">
                <input
                  required
                  type="text"
                  className="form-control border-0"
                  placeholder="Escribe el mensaje ..."
                  name="message" 
                  id="message" 
                  value={message} 
                  onChange={this.cambioValor} 
                />
                <div className="input-group-text bg-transparent border-0">
                  <button type="submit" className="btn btn-light text-secondary" >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>

    );
  }
}

//export default Editar;
export default withParams(Crear);


