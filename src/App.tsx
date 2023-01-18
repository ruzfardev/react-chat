import React, { FC, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { AuthContext } from "./context/AuthContext";

const App: FC = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtedtedRoutes = ({ children }: any) => {
    if (currentUser) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtedtedRoutes>
              <Home />
            </ProtedtedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};
export default App;
