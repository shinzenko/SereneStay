import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";

function App() {
  const { isLoggedIn } = useAppContext();
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
              <Search />
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
        {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layouts>
                  <AddHotel />
                </Layouts>
              }
            />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route
              path="/my-hotels"
              element={
                <Layouts>
                  <MyHotels />
                </Layouts>
              }
            />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layouts>
                  <EditHotel />
                </Layouts>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
