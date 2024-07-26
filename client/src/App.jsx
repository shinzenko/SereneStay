import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layouts>
              <span>HomePages</span>
            </Layouts>
          }
        />
        <Route
          path="/search"
          element={
            <Layouts>
              <span>SearchPages</span>
            </Layouts>
          }
        />
        <Route
          path="/register"
          element={
            <Layouts>
              <Register />
            </Layouts>
          }
        />
        <Route
          path="/login"
          element={
            <Layouts>
              <Login />
            </Layouts>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
