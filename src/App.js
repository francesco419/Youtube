import Home from "./Home"
import Search from "./Search";
import ShowVideo from "./ShowVideo";
import Shorts from "./Shorts";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ShowVideo/:id" element={<ShowVideo/>} />
        <Route path="/Shorts" element={<Shorts/>} />
        <Route path="/Search" element={<Search/>} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
