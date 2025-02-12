import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: "q1", text: "How do you express love?", options: ["Words", "Actions", "Gifts", "Quality Time"] },
    { id: "q2", text: "What's your ideal date?", options: ["Dinner & Movie", "Adventure", "Netflix & Chill", "Deep Talks"] },
    { id: "q3", text: "What's your biggest love flaw?", options: ["Too dramatic", "Overthinking", "Too distant", "Fall too fast"] },
  ];

  const handleSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    // Logic to calculate personality type based on answers
    const randomPersonality = ["🔥 The Hopeless Romantic", "🎭 The Dramatic Lover", "💘 The Overthinker"][Math.floor(Math.random() * 3)];
    localStorage.setItem("valentinePersonality", randomPersonality);
    navigate("/card");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-6 text-center">
      <h2 className="text-3xl font-bold text-red-500">Find Your Valentine Personality 💘</h2>
      <div className="mt-6 space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">{q.text}</p>
            <div className="flex gap-4 mt-2">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(q.id, opt)}
                  className={`px-4 py-2 rounded-lg border ${answers[q.id] === opt ? "bg-red-500 text-white" : "bg-gray-200"} transition`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600 transition"
      >
        Reveal My Card 🎴
      </button>
    </div>
  );
}

export default Quiz;
