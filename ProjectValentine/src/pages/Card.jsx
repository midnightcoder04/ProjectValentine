import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import ScratchCard from "react-scratchcard"; 

function CardReveal() {
  const navigate = useNavigate();
  const [personality, setPersonality] = useState("");

  useEffect(() => {
    const storedPersonality = localStorage.getItem("valentinePersonality");
    if (!storedPersonality) navigate("/quiz");
    else setPersonality(storedPersonality);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center">
      <h2 className="text-3xl font-bold text-red-500">Scratch to Reveal Your Valentine Personality! 🎴</h2>
      <div className="mt-6">
        {/* <ScratchCard
          width={300}
          height={150}
          image="https://upload.wikimedia.org/wikipedia/commons/6/65/Scratchcard_texture.png"
          finishPercent={50}
          onComplete={() => alert("You revealed your card!")}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg text-xl font-bold">{personality}</div>
        </ScratchCard> */}
      </div>
      <button
        onClick={() => navigate("/compare")}
        className="mt-6 px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600 transition"
      >
        Compare Matches 💕
      </button>
    </div>
  );
}

export default CardReveal;
