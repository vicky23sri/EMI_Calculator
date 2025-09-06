// src/utils/api.js
export const sendMessageToAPI = async (message, sessionId) => {
  try {
    const response = await fetch('http://localhost:8000/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        session_id: sessionId || undefined
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

export const handleDownload = async (filename, dataType, parameters) => {
  const response = await fetch('http://localhost:8000/api/v1/chat/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query_type: dataType,
      ...parameters
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};