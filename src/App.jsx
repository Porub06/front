import "./App.css";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import TermekLista from "./components/TermekLista";
import UserForm from "./components/UserForm";
import Home from "./components/Home";
import MultiForm from "./components/MultiForm";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./components/useForm.css";

function App() {
    return (
        <Router>
            <Navbar />
            <main className="page-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/termekek" element={<TermekLista />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegForm />} />
                    <Route path="/user" element={<UserForm />} />
                    <Route path="/multiform" element={<MultiForm />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
