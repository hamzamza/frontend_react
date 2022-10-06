import {
  BrowserRouter as Router,
  Route,
  Routes

} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
const Notfound = () => {
  return (<div>
    <div style={{ display: "flex", justifyContent: "center" }} >
      <h1> not found error</h1>
    </div>


  </div>)
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotel/select/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  )
}

export default App;
