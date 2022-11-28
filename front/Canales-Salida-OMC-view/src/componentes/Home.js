import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Estilos.css";

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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /**
   * @description Este metodo se encarga de presenar el DOM
   *
   * @author Fabrica Digital Microservicios
   * @versión 0.0.1-SNAPSHOT
   *
   */
  render() {
    return (
      <div className=" mt-4" id="content-email">
        <h1>Home V4</h1>
      </div>
    );
  }
}

//export default Editar;
export default withParams(Home);
