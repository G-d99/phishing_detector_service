import axios from "axios";

export const analyzeData = async (data) => {
  try {
    const formData = new FormData();

    if (data.url) formData.append("url", data.url);
    if (data.email) formData.append("email", data.email);
    if (data.html) formData.append("html", data.html);
    if (data.text) formData.append("text", data.text);
    if (data.file) formData.append("upload_file", data.file);

    const response = await axios.post("http://localhost:8000/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
};



