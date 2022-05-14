import Sms from "./componentes/Sms";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Correo from './componentes/Correo';

function App() {
  return (
    <Router>
      
      <div >
        <Routes>
           <Route exact path="/sms" element={<Sms/>}/>
           <Route exact path="/correo" element={<Correo/>}  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
