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
import Settings from "./pages/settings/Settings";
import NavBar from "./components/navbar/NavBar";
import ConnexionLayout from "./layouts/ConnxionLayout";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
function App() {
  return (
    <div id="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        {/* user routes */}
        {/* association routes */}
        <Route path="/join-request" element={<JoinRequests />} />
        <Route path="/my-acts" element={<MyActs />} />
        {/* association routes */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
