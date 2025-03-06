import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import About from "./pages/about/About";
import Acts from "./pages/acts/Acts";
import Register from "./pages/register/Register";
import SingleAct from "./pages/singleAct/SingleAct";
import Associations from "./pages/associations/Associations";
import ContactUs from "./pages/contactus/ContactUs";
import JoinRequests from "./pages/joinRequests/JoinRequests";
import Login from "./pages/login/Login";
import MyActs from "./pages/myActs/MyActs";
import Profile from "./pages/profile/Profile";
// import Settings from "./pages/settings/Settings";
import NavBar from "./components/navbar/NavBar";
import ConnexionLayout from "./layouts/ConnxionLayout";
import PublicRoutes from "./routes/PublicRoutes";
import UserRoutes from "./routes/UserRoutes";
import SingleAsso from "./pages/singleAsso/SingleAsso";
import SettingsLayout from "./layouts/SettingsLayout";
import UpdateEmail from "./pages/updateEmail/UpdateEmail";
import UpdatePassword from "./pages/updatePassword/UpdatePassword";
import UpdateInformations from "./pages/updateInformations/UpdateInformations";
import AssociationRoutes from "./routes/AssociationRoutes";
import AccountLayout from "./layouts/AccountLayout";
import AddAct from "./pages/addAct/AddAct";
import WrongPath from "./pages/wrongPath/WrongPath";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
function App() {
  return (
    <div id="App">
      <NavBar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/verify-email/:id" element={<VerifyEmail />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route element={<ConnexionLayout />}>
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
        </Route>
        {/* user routes */}
        <Route path="/acts" element={<Acts />} />
        <Route path="/acts/:id" element={<SingleAct />} />
        <Route path="/associations" element={<Associations />} />
        <Route path="/associations/:id" element={<SingleAsso />} />
        <Route
          path="/profile"
          element={
            <UserRoutes>
              <Profile />
            </UserRoutes>
          }
        />

        {/* user routes */}
        {/* association routes */}
        <Route element={<AccountLayout />}>
          <Route
            path="/add-act"
            element={
              <AssociationRoutes>
                <AddAct />
              </AssociationRoutes>
            }
          />
          <Route
            path="/my-acts"
            element={
              <AssociationRoutes>
                <MyActs />
              </AssociationRoutes>
            }
          />
          <Route
            path="/join-request"
            element={
              <AssociationRoutes>
                <JoinRequests />
              </AssociationRoutes>
            }
          />
        </Route>
        {/* association routes */}

        <Route
          element={
            <UserRoutes>
              <SettingsLayout />
            </UserRoutes>
          }
        >
          <Route path="/update-email" element={<UpdateEmail />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/update-infos" element={<UpdateInformations />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<WrongPath />} />
      </Routes>
    </div>
  );
}

export default App;
