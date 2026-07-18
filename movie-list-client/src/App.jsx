import Login from "./pages/login";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Signup from "./pages/signup"
import Dashboard from "./pages/dashboard"
function App(){
  return (
    <BrowserRouter>
    <Routes>
      < Route path="/" element={<Login/>} />
      < Route path="/signup" element={<Signup/>} />
      < Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;