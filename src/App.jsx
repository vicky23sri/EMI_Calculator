import { Routes, Route } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/Login"
import SignUp from "./pages/Signup";
import Calculator from "./pages/Calculator";
import ManualCalculator from "./pages/ManualCalculator";
import AiCalculator from "./pages/AiCalculator";
import EMIPage from "./pages/Emi";
import Dashboard from "./pages/Dashboard";
import Forgotpassword from "./pages/Forgotpassword";

const App = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/calculator" element={<Calculator />}></Route>
          <Route path="/manual" element={<ManualCalculator />}></Route>
          <Route path="/ai" element={<AiCalculator />}></Route>
          <Route path="/emi" element={<EMIPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;