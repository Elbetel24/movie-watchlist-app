import Login from "./pages/login";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Signup from "./pages/signup"
import Dashboard from "./pages/dashboard"
import WatchListPage from "./pages/WatchListPage";
import WatchedListPage from "./pages/WatchedList";
function App(){
  return (
    <BrowserRouter>
    <Routes>
      < Route path="/" element={<Login/>} />
      < Route path="/signup" element={<Signup/>} />
      < Route path="/dashboard" element={<Dashboard/>} />
      < Route path="/WatchListPage" element={<WatchListPage/>}/>
      < Route path="/WatchedListPage" element={<WatchedListPage/>} />

      </Routes>
      </BrowserRouter>
  );
}

export default App;