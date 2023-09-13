import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import MainLandingPage from "./components/pages/MainLandingPage"

const App = () => {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/admin/signup" element={<SignUp />} />
        <Route path="/admin/signin" element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App;