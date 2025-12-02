// src/api.js
import axios from "axios";

// 백엔드 주소 환경변수 사용, 없으면 로컬 주소 기본값
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// URL 분석 요청
export const analyzeURL = (urlData) => {
  return axios.post(`${API_URL}/analyze`, urlData);
};

// 파일 업로드 요청
export const analyzeFile = (fileData) => {
  const formData = new FormData();
  formData.append("upload_file", fileData);
  return axios.post(`${API_URL}/analyze`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

};
