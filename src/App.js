import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await axios.post("http://localhost:8000/analyze", {
        url,
        text
      });
      setResult(res.data);
    } catch (err) {
      alert("백엔드 연결 실패");
    }
  };

  return (
    <div style={{ width: "600px", margin: "40px auto" }}>
      <h2>피싱/악성 위협 탐지 시스템</h2>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL 입력"
        style={{ width: "100%", padding: "8px", marginTop: "12px" }}
      />
      <input
        type="file"
        accept=".txt,.html,.eml"
        onChange={(e) => {
         const file = e.target.files[0];
         const reader = new FileReader();
         reader.onload = () => setText(reader.result);
         reader.readAsText(file);
  }}
  style={{ marginTop: "12px" }}
/>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="텍스트 입력"
        style={{ width: "100%", height: "100px", padding: "8px", marginTop: "12px" }}
      />

      <button
        onClick={handleAnalyze}
        style={{ padding: "12px 20px", marginTop: "12px", cursor: "pointer" }}
      >
        위협 분석
      </button>

      {result && (
        <div style={{ marginTop: "20px", padding: "16px", border: "1px solid #ccc" }}>
          <p>최종판정: {result.최종판정}</p>
          <p>위협유형: {result.위협유형}</p>
          {Array.isArray(result.판단근거) && (
            <p>판단근거: {result.판단근거.join(", ")}</p>
          )}
          <p>위험점수: {result.위험점수}</p>
          <p>권장대응: {result.권장대응}</p>
        </div>
      )}
    </div>
  );
}

export default App;
