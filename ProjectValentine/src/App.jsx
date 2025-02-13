import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Card from "./pages/Card";
import Compare from "./pages/Compare";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen w-full bg-gray-900 text-white">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/card" element={<Card />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
