import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import { Toaster } from "react-hot-toast";
import ProfileAndForm from "./components/profileAndForm";
import { Provider } from "./context/context";
import Nav from "./components/nav";
import { LoginPrivateRoute, PrivateRoute } from "./components/privateRoute";
import UpdateProfile from "./components/updateProfile";
import ResetPassword from "./components/resetPassword";
export default function App() {
  return (
    <Provider>
      <div>
        <Toaster />
        <Nav />
        <Routes>
          <Route index path="/" element={<Home />}></Route>

          <Route
            path="/login"
            element={<LoginPrivateRoute element={<Login />} />}
          ></Route>
          <Route
            path="/signup"
            element={<LoginPrivateRoute element={<Signup />} />}
          ></Route>
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfileAndForm />} />}
          ></Route>
          <Route
            path="/updateProfile"
            element={<PrivateRoute element={<UpdateProfile />} />}
          ></Route>
          <Route
            path="/resetPassword"
            element={<PrivateRoute element={<ResetPassword />} />}
          ></Route>

          <Route
            path="/deleteProfile"
            element={<PrivateRoute element={<ResetPassword />} />}
          ></Route>

          <Route
            path="*"
            element={
              <div className=" w-full h-screen flex items-center justify-center">
                <h1 className=" text-center text-3xl font-extrabold py-10">
                  page not found
                </h1>
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </Provider>
  );
}
