import Login from "./pages/Login";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
function App(){
  return (
    <BrowserRouter>
    <Routes>
      < Route path="/" element={<Login/>} />
      < Route path="/Signup" element={<Signup/>} />
      < Route path="/Dashboard" element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;