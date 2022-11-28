import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './componentes/Home';
import Correo from './componentes/Correo';
import Sms from './componentes/Sms';


function App() {
  return (
    <Router basename='/aro-canal-oms-view/oms-view'>
      <div >
        <Routes>
           <Route exact path="/" element={<Home/>}  />
           <Route exact path="/correo" element={<Correo/>}  />
           <Route exact path="/sms" element={<Sms/>}  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
