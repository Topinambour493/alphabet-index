import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home/home";
import Test from "./pages/test/test";
import Scoring from "./components/scoring/scoring";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/scoring" element={<Scoring/>}/>
      </Routes>
    </BrowserRouter>
  );
}
