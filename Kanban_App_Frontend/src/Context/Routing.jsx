import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Notes from "../Pages/Notes";
import PrivateRoute from "./PrivateRoute";
import Edit from "../Pages/Edit";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <Notes />
          </PrivateRoute>
        }
      />
      <Route path="/note/edit/:id" element={<Edit/>} />
    </Routes>
  );
};

export default Routing;
