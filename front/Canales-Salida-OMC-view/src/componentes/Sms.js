import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Estilos.css";
import micalro from "../assets/Claro.svg";
import axios from "axios";

/* This is a higher order component that
 *  inject a special prop   to our component.
 */
function withParams(Component) {
  return (props) => (
    <Component
      {...props}
      params={useParams()}
      navigate={useNavigate()}
      location={useLocation()}
    />
  );
}

class Sms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phones: [],
      phone: "",
      smsTemplate: "",
      hora: "",
      infoDecript: {},
      errores: [],
      errorSmsContent: "",
      errorBackend: "",
      smsContent: "", 
      informaiveLink: ""
    };
  }
  /**
   * @description Este metodo se encarga de mantener actualizados los valores que se cambien en el formulario
   *
   * @author Fabrica Digital Microservicios
   * @versión 0.0.1-SNAPSHOT
   *
   */
  changeValue = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state, errores: [] });
  }
  /**
   * @description Este metodo se encarga de identificar si algun valor del formulario tiene algun error Ej: identifica campos vacios.
   *
   * @author Fabrica Digital Microservicios
   * @versión 0.0.1-SNAPSHOT
   *
   */
  checkError(elemento) {
    return this.state.errores.indexOf(elemento) !== -1;
  }
  /**
   * @description Este metodo se el primero que se inicializa cuando el componente se manda al DOM
   *
   * @author Fabrica Digital Microservicios
   * @versión 0.0.1-SNAPSHOT
   *
   */
  componentDidMount() {
    console.log(process.env.REACT_APP_API_SMS)
    this.decriptToken();
    this.curretTime();
  }

  /**
   * @description Este metodo se encarga de consumir el servicio que desencripta el token
   *
   * @author Fabrica Digital Microservicios
   * @versión 0.0.1-SNAPSHOT
   *
   */
  decriptToken() {
    let params = new URLSearchParams(document.location.search);
    let tokenUrl = params.get("token");

    if (tokenUrl !== null && tokenUrl.length !== 0) {

      tokenUrl = tokenUrl.replace(/ /g, "+");

      

      axios
        .post(process.env.REACT_APP_API_SMS + "api/v1/sms/decript", {
          token: tokenUrl,
        })
        .then((response) => {
          this.setState({ infoDecript: response });
          if (
            response.data.phones !== null &&
            response.data.phones.length !== 0
          ) {
            var arrayDeCadenas = response.data.phones.split("-");
            const phones = [];
            for (var i = 0; i < arrayDeCadenas.length; i++) {
              phones.push({ id: i, phone: arrayDeCadenas[i] });
            }

            this.setState({
              phones: phones,
              phone: arrayDeCadenas[1],
            });
          }
        })
        .catch((error) => {
          this.setState({
            errorBackend: `Error: ${error.message}`,
          });
          document.getElementById("alertErrorBackend").style.display = "block";
          console.log(error);
        });
    }
  }

  /**
   * @description Este metodo se encarga de enviar la informacion desencriptada para el envio del SMS
   *
   * @author Fabrica Digital Microservicios
   * @versión 0.0.1-SNAPSHOT
   *
   */
  sentDate = (e) => {
    var errores = [];

    if (!this.state.smsContent) {
      errores.push("error_sms_content");
      this.setState({ errorSmsContent: "Ingrese un mensaje" });
    }
    if (this.state.smsContent.length > 170) {
      errores.push("error_sms_content");
      this.setState({ errorSmsContent: "El mensaje supera 170 caracteres" });
    }
    if (!this.state.phone) errores.push("error_telefono_vacio");

    if (!this.state.informaiveLink) errores.push("error_linkinformativo_vacio");

    this.setState({ errores: errores });
    if (errores.length > 0) return false;

    const data = this.state.infoDecript.data;
    delete data.phones;

    var smsTemplate = this.smsTemplate(this.state.smsContent, this.state.informaiveLink);
    this.setState({ smsTemplate: smsTemplate });

    const dataToSend = Object.assign(
      data,
      { phone: this.state.phone },
      { message: smsTemplate }
    );

    axios
      .post(process.env.REACT_APP_API_SMS + "api/v1/sms/send",  dataToSend)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        this.setState({
          errorBackend: `Error: ${error.message} - ${error.response.data.message}`,
        });
        document.getElementById("alertErrorBackend").style.display = "block";
        console.log(error);
      });

    document.getElementById("cardfooter").style.display = "none";
    document.getElementById("phone").disabled = true;
    document.getElementById("messagesent").style.display = "block";
  };

  /**
   * @description Este metodo se encarga de obtener la hora actual
   *
   * @author Fabrica Digital Microservicios
   * @versión 0.0.1-SNAPSHOT
   *
   */
  curretTime() {
    const hoy = new Date();
    this.state.hora = hoy.getHours() + ":" + hoy.getMinutes();
    this.state.hora = hoy.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /**
   * @description Este metodo se encarga de presenar el DOM
   *
   * @author Fabrica Digital Microservicios
   * @versión 0.0.1-SNAPSHOT
   *
   */

  render() {
    const { phone, smsTemplate, phones, errorSmsContent, errorBackend, smsContent, informaiveLink } = this.state;
    return (
      <div className="container mt-4">
        <div
          id="alertErrorBackend"
          className="alert alert-danger"
          style={{ display: "none" }}
          role="alert"
        >
          {errorBackend}
        </div>
        <div className="card mx-auto">
          <div className="card-header bg-transparent">
            <div className="navbar navbar-expand p-0">
              <div className="input-group">
                <select
                  className={
                    (this.checkError("error_telefono_vacio")
                      ? "is-invalid"
                      : "") + " form-control"
                  }
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={this.changeValue}
                >
                  {phones.map((phon) => (
                    <option key={phon.id}>{phon.phone}</option>
                  ))}
                </select>
                <small className="invalid-feedback">
                  Seleccione un teléfono
                </small>
              </div>
            </div>
          </div>
          <div
            className="card-body p-4"
            style={{ height: "400px", overflow: "auto" }}
          >
            <div id="messagesent" style={{ display: "none" }}>
              <div className="d-flex align-items-baseline text-end justify-content-end mb-4">
                <div className="pe-2">
                  <div>
                    <div className="card card-text d-inline-block p-2 px-3 m-1">
                      {smsTemplate}
                    </div>
                  </div>
                  <div>
                    <div className="small">{this.state.hora}</div>
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
          </div>

          <div
            id="cardfooter"
            className="card-footer bg-white position-absolute w-100 bottom-0 m-0 p-1"
          >
            <div className="input-group">
              <input
                className={
                  (this.checkError("error_sms_content") ? "is-invalid" : "") +
                  " form-control"
                }
                type="text"
                placeholder="Escribe el mensaje ..."
                name="smsContent"
                id="smsContent"
                value={smsContent}
                onChange={this.changeValue}
              />
              <small className="invalid-feedback">{errorSmsContent}</small>
            </div>
            <div className="input-group">
              <input
                className={
                  (this.checkError("error_linkinformativo_vacio") ? "is-invalid" : "") +
                  " form-control"
                }
                type="text"
                placeholder="Pega el link informativo ..."
                name="informaiveLink"
                id="informaiveLink"
                value={informaiveLink}
                onChange={this.changeValue}
              />

              <div className="input-group-text bg-transparent border-0">
                <button
                  type="button"
                  className="btn btn-light text-secondary"
                  onClick={this.sentDate}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              <small className="invalid-feedback">El link informativo no puede estar vacío </small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * @description Este metodo se encarga de construir la plantilla para el envio del correo
   *
   * @author Fabrica Digital Microservicios
   * @versión 0.0.1-SNAPSHOT
   *
   */
  smsTemplate(smsContent, informaiveLink){
    return `¡Hola¡ De acuerdo a tu consulta, ${smsContent}. Ingresa en este link y mira el video ${informaiveLink} AplicaTyC`
  }

}


//export default Editar;
export default withParams(Sms);
