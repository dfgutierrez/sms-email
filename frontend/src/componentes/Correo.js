import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Estilos.css";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

class Correo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phones: [],
      phone: "",
      message: '<p>&nbsp;</p><p>&nbsp;</p><p>--</p><p><strong>Cargo</strong><br><strong>Nombre Asesor</strong><br><strong>Celular /Ext:3022228888</strong><br><a href="mailto:Elmer.SantosCa@claro.com.co"><strong>asesor@claro.com.co</strong></a></p>',
      hora: "",
      infoDecript: {},
      errores: [],
      errorMessage: "",
      errorBackend: "",
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
  };

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
    this.setState({ message: '' });
    
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

    if (tokenUrl != null && tokenUrl.length != 0) {
      tokenUrl = tokenUrl.replace(/\s+/g, "+");

      axios
        .post(process.env.REACT_APP_API + "api/v1/sms/decript", {
          token: tokenUrl,
        })
        .then((response) => {
          this.setState({ infoDecript: response });
          if (
            response.data.phones != null &&
            response.data.phones.length != 0
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

    if (!this.state.message) {
      errores.push("error_mensaje");
      this.setState({ errorMessage: "Ingrese un mensaje" });
    }
    if (this.state.message.length > 170) {
      errores.push("error_mensaje");
      this.setState({ errorMessage: "El mensaje supera 170 caracteres" });
    }
    if (!this.state.phone) errores.push("error_telefono_vacio");

    this.setState({ errores: errores });
    if (errores.length > 0) return false;

    const data = this.state.infoDecript.data;
    delete data.phones;
    const dataToSend = Object.assign(
      data,
      { phone: this.state.phone },
      { message: this.state.message }
    );

    axios
      .post(process.env.REACT_APP_API + "api/v1/sms/send", dataToSend)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        this.setState({
          errorBackend: `Error: ${error.message}`,
        });
        document.getElementById("alertErrorBackend").style.display = "block";
        console.log(error);
      });

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
    const { phone, message, phones, errorMessage, errorBackend, setMessage } = this.state;
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
              <div className="input-group-text bg-transparent border-0">
                <button
                  type="button"
                  className="btn btn-light text-secondary"
                  onClick={this.sentDate}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              <div className="input-group">
                <select
                  className={
                    (this.checkError("error_telefono_vacio")
                      ? "is-invalid"
                      : "") + " form-control "
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
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <small className="invalid-feedback">
                  Seleccione un teléfono
                </small>
              </div>
            </div>
          </div>

        </div>
        <CKEditor
                    editor={ ClassicEditor }
                    data={message}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();

                        this.setState({ message: data });
                        console.log( { event, editor, data } );
                        
                    } }
                />
                {message}
      </div>
    );
  }
}

//export default Editar;
export default withParams(Correo);
