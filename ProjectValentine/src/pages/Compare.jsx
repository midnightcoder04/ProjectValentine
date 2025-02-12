import { useState } from "react";

const compatibilityData = {
  "🔥 The Hopeless Romantic": { "🎭 The Dramatic Lover": 80, "💘 The Overthinker": 60, "🚀 The Adventure Seeker": 100 },
  "🎭 The Dramatic Lover": { "💘 The Overthinker": 40, "🚀 The Adventure Seeker": 90, "🔥 The Hopeless Romantic": 80 },
};

function Compare() {
  const [yourCard] = useState(localStorage.getItem("valentinePersonality") || "");
  const [theirCard, setTheirCard] = useState("");
  const [matchPercentage, setMatchPercentage] = useState(null);

  const checkMatch = () => {
    setMatchPercentage(compatibilityData[yourCard]?.[theirCard] || "Unknown 🤷‍♂️");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-6 text-center">
      <h2 className="text-3xl font-bold text-red-500">Compare Your Love Match! 💕</h2>
      <p className="mt-4 text-lg">Your personality: <strong>{yourCard || "Unknown"}</strong></p>
      
      <select
        onChange={(e) => setTheirCard(e.target.value)}
        className="mt-4 p-3 border rounded-lg bg-white"
      >
        <option value="">Select Their Card</option>
        <option value="🔥 The Hopeless Romantic">🔥 The Hopeless Romantic</option>
        <option value="🎭 The Dramatic Lover">🎭 The Dramatic Lover</option>
        <option value="💘 The Overthinker">💘 The Overthinker</option>
        <option value="🚀 The Adventure Seeker">🚀 The Adventure Seeker</option>
      </select>

      <button
        onClick={checkMatch}
        className="mt-6 px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600 transition"
      >
        Check Compatibility ❤️
      </button>

      {matchPercentage !== null && (
        <p className="mt-4 text-lg font-bold">Match Percentage: {matchPercentage}%</p>
      )}
    </div>
  );
}

export default Compare;
