import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NotFound from "./components/basic/NotFound";
import Login from "./components/basic/Login";
import Signup from "./components/basic/Signup";
import Home from "./components/basic/Home";
import AuthState from "./components/context/auth/AuthState";
import UserState from "./components/context/users/UserState";
import Private from "./components/secured/Private";
import Account from "./components/basic/Account";



function App() {
  return (
    <AuthState>
      <UserState>
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route
                exact
                path="/home"
                element={
                  <Private>
                    <Home />
                  </Private>
                }
              />
              <Route
                exact
                path="/settings"
                element={
                  <Private>
                    <Account />
                  </Private>
                }
              />
              <Route exact path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </UserState>
    </AuthState>
  );
}

export default App;
