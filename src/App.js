import Home from "./Home"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
