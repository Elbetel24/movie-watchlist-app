import Login from "./pages/Login";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup"


function App(){
  return (
    <BrowserRouter>
    <Routes>
      < Route path="/" element={<Login/>} />
      < Route path="/Signup" element={<Signup/>} />

      </Routes>
      </BrowserRouter>
  );
}

export default App;