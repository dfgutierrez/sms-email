import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Estilos.css";
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


class Correo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      email: "",
      hora: "",
      infoDecript: {},
      errores: [],
      errorBackend: "",
      mailContent: "", 
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
            response.data.emails !== null &&
            response.data.emails.length !== 0
          ) {
            var arrayDeCadenas = response.data.emails.split("-");
            const emails = [];
            for (var i = 0; i < arrayDeCadenas.length; i++) {
              emails.push({ id: i, email: arrayDeCadenas[i] });
            }

            this.setState({
              emails: emails,
              email: arrayDeCadenas[1],
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

    if (!process.env.REACT_APP_SUBJECT) errores.push("error_asunto_vacio");
    if (!this.state.mailContent) errores.push("error_contenido_vacio");
    if (!this.state.informaiveLink) errores.push("error_linkinformativo_vacio");
    if (!this.state.email) errores.push("error_email_vacio");

    this.setState({ errores: errores });
    if (errores.length > 0) return false;

    const data = this.state.infoDecript.data;
    delete data.emails;
    
    var arrayNames = data.clientName.split(" ");
    var onlyFirstName = arrayNames[0]
    var emailTemplate = this.mailTemplate(onlyFirstName, data.clientEmail, this.state.mailContent, this.state.informaiveLink, data.asesorName);

    const dataToSend = Object.assign(
      data,
      { email: this.state.email },
      { message: emailTemplate},
      { subject: process.env.REACT_APP_SUBJECT }
    );

    axios
      .post(process.env.REACT_APP_API_EMAIL + "api/v1/email/send", dataToSend)
      .then((response) => {
        
        document.getElementById('content-email').innerHTML = emailTemplate;
        console.log(response);
      })
      .catch((error) => {
        this.setState({
          errorBackend: `Error: ${error.message} - ${error.response.data.message}`,
        });
        document.getElementById("alertErrorBackend").style.display = "block";
        console.log(error);
      });

    document.getElementById("email").disabled = true;
    
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
    const { email, emails, errorBackend, mailContent, informaiveLink} = this.state;
    return (
      <div className=" mt-4" id="content-email">
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
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Asunto</span>
                </div>
                <input
                  disabled
                  className={
                    (this.checkError("error_asunto_vacio")
                      ? "is-invalid"
                      : "") + " form-control "
                  }
                  type="text"
                  name="subject"
                  id="subject"
                  value={process.env.REACT_APP_SUBJECT}
                  onChange={this.changeValue}
                />
                <small className="invalid-feedback">
                  El asunto no puede estar vacío 
                </small>
              </div>
            </div>
            <div className="navbar navbar-expand p-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Contenido</span>
                </div>
                <input
                  className={
                    (this.checkError("error_contenido_vacio")
                      ? "is-invalid"
                      : "") + " form-control "
                  } 
                  type="text"
                  name="mailContent"
                  id="mailContent"
                  value={mailContent}
                  onChange={this.changeValue}
                />
                <small className="invalid-feedback">
                  El contenido no puede estar vacío 
                </small>
              </div> 
            </div>
            <div className="navbar navbar-expand p-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Link informativo</span>
                </div>
                <input
                  className={
                    (this.checkError("error_linkinformativo_vacio")
                      ? "is-invalid"
                      : "") + " form-control "
                  }
                  type="text"
                  name="informaiveLink"
                  id="informaiveLink"
                  value={informaiveLink}
                  onChange={this.changeValue}
                />
                <small className="invalid-feedback">
                  El link informativo no puede estar vacío 
                </small>
              </div>
              
            </div>
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
                    (this.checkError("error_email_vacio")
                      ? "is-invalid"
                      : "") + " form-control "
                  }
                  name="email"
                  id="email"
                  value={email}
                  onChange={this.changeValue}
                >
                  {emails.map((emai) => (
                    <option key={emai.id}>{emai.email}</option>
                  ))}
                </select>
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <small className="invalid-feedback">
                  Seleccione un correo
                </small>
              </div>
              
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
  mailTemplate(customerName, customerEmail, mailContent, informaiveLink, advisorName){

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <style>
        #m_-6142830324193549726bodyTable{background-color: #ffffff!important;}
        .o365button { display: block !important; }
        td div { display: block !important; }
        .x_fr-fil { display: block !important; }
        .x_fr-dib { display: block !important; }
        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        p { display: block; margin: 13px 0; }
        </style>
      </head>
      <body style="margin:0 auto; padding:0;" topmargin="0" bgcolor="#ffffff" width="100%">
        <div style="margin:0px auto; width: 100%; max-width:600px;">
          <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%; max-width: 600px;" align="center" border="0">
            <tr>
              <td>
                <table style="display: inline-table; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="600">
                  <tr><td style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#999999; text-align: center;background-color: #ffffff;"><br><p>Con Claro puedes todo</p><br></td></tr>
                </table>
                <table bgcolor="#f8f8f8" style="display: block; border-collapse:collapse; border-spacing:0px; background-image: url('https://images.iestrategias.com/claro/2021/fondo/f8f8f8.jpg');" border="0" cellpadding="0" cellspacing="0" width="600">
                  <tr><td width="600" align="center" valign="top"><img src="http://images.iestrategias.com/claro/2022/junio/vas/asesor/bn.jpg" width="600" alt="Larga Distancia Internacional" title="Larga Distancia Internacional" style="display: block; margin: 0px; padding: 0px; border: 0;"></td></tr>
                  <tr>
                    <td width="600" align="center">
                      <table bgcolor="#ffffff" style="display: block; border-collapse:collapse; border-spacing:0px; background-image: url('https://images.iestrategias.com/claro/2021/fondo/ffffff.jpg');" border="0" cellpadding="0" cellspacing="0" width="550">
                        <tr><td height="30"></td></tr>
                        <tr>
                          <td width="550" align="center">
                            <table style="display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="480">
                              <tr><td width="480" style="font-family: Arial, Helvetica, sans-serif; text-decoration: none; color: #5e5e5e; font-size: 16px; line-height: 19px; text-align: center;"><span style="font-weight: bold; font-size: 18px;">&#161;Hola  *${customerName}*&#33;</span><br><br>De acuerdo con tu consulta,</td></tr>
                            </table>
                          </td>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                          <td width="550" align="center">
                            <table style="border: 1px solid #B3B3B3; border-radius: 7px; display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="480">
                              <tr><td width="480" height="40" style=" font-family: Arial, Helvetica, sans-serif; text-decoration: none; color: #5e5e5e; font-size: 14px; line-height: 19px; text-align: center;">${mailContent}</td></tr>
                            </table>
                          </td>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                          <td width="550" align="center">
                            <table style="display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="480">
                              <tr><td width="480" style="font-family: Arial, Helvetica, sans-serif; text-decoration: none; color: #5e5e5e; font-size: 16px; line-height: 19px; text-align: center;">Ingresa en este link y mira el video</td></tr>
                            </table>
                          </td>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr><td width="550" align="center" valign="top"><a href="${informaiveLink}" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="http://images.iestrategias.com/claro/2022/junio/vas/asesor/btn.png" width="278" alt="Larga Distancia Internacional" title="Larga Distancia Internacional" style="display: block; margin: 0px; padding: 0px; border: 0;"></a></td></tr>
                        <tr><td height="30"></td></tr>
                      </table>
                    </td>
                  </tr>
                  <tr><td height="30"></td></tr>
                  <tr>
                    <td width="600" align="center">
                      <table bgcolor="#ffffff" style="display: block; border-collapse:collapse; border-spacing:0px; background-image: url('https://images.iestrategias.com/claro/2021/fondo/ffffff.jpg');" border="0" cellpadding="0" cellspacing="0" width="550">
                        <tr><td height="30"></td></tr>
                        <tr>
                          <td width="550" align="center">
                            <table style="display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="480">
                              <tr><td width="480" style="font-family: Arial, Helvetica, sans-serif; text-decoration: none; color: #5e5e5e; font-size: 16px; line-height: 19px; text-align: center;">Si es necesario toma nota de los pasos, recuerda que puedes pausar y devolverte las veces que deseas.</td></tr>
                            </table>
                          </td>
                        </tr>
                        <tr><td height="30"></td></tr>
                        <tr><td><hr style="border:0.5px solid #eeeeee; width: 450px;"></td></tr>
                        <tr><td height="30"></td></tr>
                        <tr>
                          <td width="550" align="center">
                            <table style="display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="450">
                              <tr><td width="450" style="font-family: Arial, Helvetica, sans-serif; text-decoration: none; color: #5e5e5e; font-size: 16px; line-height: 19px; text-align: left;">Soy tu asesor</td></tr>
                            </table>
                          </td>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                          <td width="550" align="center">
                            <table style="display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="450">
                              <tr>
                                <td width="60" align="left"><img src="http://images.iestrategias.com/claro/2021/octubre/vas/variable/ico2.png" width="41" style="display: block; margin: 0px; padding: 0px; border: 0;"></td>
                                <td width="390" align="center">
                                  <table style="border: 1px solid #B3B3B3; border-radius: 7px; display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="390">
                                    <tr><td width="440" height="40" style="padding-left: 20px; font-family: Arial, Helvetica, sans-serif; text-decoration: none; color: #5e5e5e; font-size: 14px; line-height: 19px; text-align: left;">${advisorName}</td></tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                          <td width="550" align="center">
                            <table style="display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="450">
                              <tr><td width="450" style="font-family: Arial, Helvetica, sans-serif; text-decoration: none; color: #5e5e5e; font-size: 16px; line-height: 19px; text-align: left;">y para mí fue un gusto ayudarte en tu consulta</td></tr>
                            </table>
                          </td>
                        </tr>
                        <tr><td height="40"></td></tr>
                        <tr><td><hr style="border:0.5px solid #eeeeee; width: 480px;"></td></tr>
                        <tr><td height="15"></td></tr>
                        <tr>
                          <td width="550" align="center">
                            <table style="display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="500">
                              <tr>
                                <td width="250" align="left"><img src="http://images.iestrategias.com/claro/2022/mayo/vas/doble/pt.png" width="137" alt="Claro colombia" title="Claro colombia" style="display: block; margin: 0px; padding: 0px; border: 0;"></td>
                                <td width="250" align="right"><img src="http://images.iestrategias.com/claro/2018/logos/logo-claro.png" width="70" alt="Claro colombia" title="Claro colombia" style="display: block; margin: 0px; padding: 0px; border: 0;"></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr><td height="15"></td></tr>
                      </table>
                    </td>
                  </tr>
                <tr><td height="25"></td></tr>
                </table>
                <!-- Legal -->
                <table style="display: inline-table; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#ffffff">
                  <tr style="background-color: #ffffff">
                    <td width="600" align="center">
                      <table style="display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="550">
                        <tr><td width="550" style="font-family:Arial, Helvetica, sans-serif; font-size: 10px; color: #5e5e5e; text-align: center; line-height: 12px;"><p>Aplican términos y condiciones en claro.com.co</p></td></tr>
                      </table>
                    </td>
                  </tr>
                  <!-- linea -->
                  <tr><td height="10" bgcolor="#ffffff"></td></tr>
                  <tr><td width="600" align="center"><table bgcolor="#ffffff" style="display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="200"><tr><td width="200" height="1" bgcolor="#D7D7D7"></td></tr></table></td></tr>
                  <tr><td height="15" bgcolor="#ffffff"></td></tr>
                  <!-- Redes Sociales -->
                  <tr>
                    <td width="600" align="center">
                      <table style="display: block; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" width="210">
                        <tr>
                          <td width="35"></td>
                          <td width="35"><a href="https://www.facebook.com/ClaroCol/" target="_blank"><img src="http://images.iestrategias.com/claro/2019/logos/fb.png" width="25" alt="Claro Colombia" title="Claro Colombia" style="display: block; margin: 0px; padding: 0px; border: 0;"></a></td>
                          <td width="35"><a href="https://www.youtube.com/user/ClaroColombia" target="_blank"><img src="http://images.iestrategias.com/claro/2019/logos/yt.png" width="25" alt="Claro Colombia" title="Claro Colombia" style="display: block; margin: 0px; padding: 0px; border: 0;"></a></td>
                          <td width="35"><a href="https://twitter.com/ClaroColombia" target="_blank"><img src="http://images.iestrategias.com/claro/2019/logos/tw.png" width="25" alt="Claro Colombia" title="Claro Colombia" style="display: block; margin: 0px; padding: 0px; border: 0;"></a></td>
                          <td width="35"><a href="https://www.instagram.com/clarocolombia/" target="_blank"><img src="http://images.iestrategias.com/claro/2019/logos/ig.png" width="25" alt="Claro Colombia" title="Claro Colombia" style="display: block; margin: 0px; padding: 0px; border: 0;"></a></td>
                          <td width="35"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr style="background-color: #ffffff">
                    <td style="font-family:Arial, Helvetica, sans-serif; font-size: 11px; color: #999999; text-align: center;">
                      <p style="font-weight: bold;">Privacidad y protecci&oacute;n de datos:</p><p>Claro Colombia respeta su privacidad. Este mail se envi&oacute; a ${customerEmail}</p><p>Este correo electr&oacute;nico ha sido enviado por<strong>: Claro Colombia, </strong>Carrera 68 # 24B 58, Bogot&aacute;.</p>
                    </td>
                  </tr>
                  <tr><td height="20" bgcolor="#ffffff"></td></tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>                
    `
  }
}

//export default Editar;
export default withParams(Correo);
