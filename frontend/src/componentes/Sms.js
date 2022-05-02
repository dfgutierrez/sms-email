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
    this.state = {};
  }
  componentDidMount(){




  }
  render() {
    return (

        <div className="container mt-4">
          <div className="card mx-auto">
            <div className="card-header bg-transparent">
              <div className="navbar navbar-expand p-0">
                <select className="form-control" name="" id="">
                  <option className={"3208654123"}>3208654123</option>
                  <option className={"3208654123"}>3208654123</option>
                  <option className={"3208654123"}>3208654123</option>
                </select>
              </div>
            </div>
            <div
              className="card-body p-4"
              style={{ height: "400px", overflow: "auto" }}
            >
              <div className="d-flex align-items-baseline text-end justify-content-end mb-4">
                <div className="pe-2">
                  <div>
                    <div className="card card-text d-inline-block p-2 px-3 m-1">
                      Let me know when you're available?
                    </div>
                  </div>
                  <div>
                    <div className="small">01:13PM</div>
                  </div>
                </div>
                <div className="position-relative avatar">
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


            <div className="card-footer bg-white position-absolute w-100 bottom-0 m-0 p-1">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Write a message..."
                />
                <div className="input-group-text bg-transparent border-0">
                  <button className="btn btn-light text-secondary">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

    );
  }
}

//export default Editar;
export default withParams(Crear);


