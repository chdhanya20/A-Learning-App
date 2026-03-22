import { useState } from "react";

function AIChat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    // 👉 SIMPLE MOCK AI (works instantly)
    if (question.toLowerCase().includes("react")) {
      setResponse("React is a JavaScript library for building UI 🔥");
    } else if (question.toLowerCase().includes("node")) {
      setResponse("Node.js is used for backend development 🚀");
    } else {
      setResponse("AI: Keep learning! You're doing great 💡");
    }

    // 👉 IF YOU WANT REAL AI (later)
    /*
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await res.json();
    setResponse(data.choices[0].message.content);
    */
  };

  return (
    <div style={styles.chatBox}>
      <h3>🤖 AI Tutor</h3>

      <input
        style={styles.input}
        placeholder="Ask about course..."
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button style={styles.btn} onClick={askAI}>
        Ask AI
      </button>

      <p>{response}</p>
    </div>
  );
}

const styles = {
  chatBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  btn: {
    background: "#6C63FF",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
  },
};

export default AIChat;