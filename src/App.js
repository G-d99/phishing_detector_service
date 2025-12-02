import React, { useState } from "react";
import { analyzeData } from "./api";

function App() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [html, setHtml] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = { url, email, html, text };
      const response = await analyzeData(data, file);
      setResult(response);
    } catch (err) {
      setError("분석 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>피싱 분석기</h2>

      <div>
        <input
          type="text"
          placeholder="URL 입력"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "400px", marginBottom: "5px" }}
        />
      </div>

      <div>
        <textarea
          placeholder="이메일 본문 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rows={3}
          cols={50}
          style={{ marginBottom: "5px" }}
        />
      </div>

      <div>
        <textarea
          placeholder="HTML 입력"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={3}
          cols={50}
          style={{ marginBottom: "5px" }}
        />
      </div>

      <div>
        <textarea
          placeholder="일반 텍스트 입력"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          cols={50}
          style={{ marginBottom: "5px" }}
        />
      </div>

      <div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: "10px" }}
        />
      </div>

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "분석 중..." : "분석 시작"}
      </button>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>분석 결과</h3>
          <p>최종 판정: {result.최종판정}</p>
          <p>위협 유형: {result.위협유형 || "없음"}</p>
          <p>판단 근거: {result.판단근거.join(", ") || "없음"}</p>
          <p>위험 점수: {result.위험점수}</p>
          <p>권장 대응: {result.권장대응}</p>
        </div>
      )}
    </div>
  );
}

export default App;



