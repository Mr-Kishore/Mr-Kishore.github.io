export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: Missing GEMINI_API_KEY' });
  }

  try {
    // Separate system instruction from conversation history
    const systemMsg = Array.isArray(messages) ? messages.find((m) => m.role === 'system') : null;
    const conversation = Array.isArray(messages) ? messages.filter((m) => m.role !== 'system') : [];

    // Convert messages to Gemini API format (user / model)
    const contents = conversation.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const bodyPayload = {
      contents,
    };

    if (systemMsg) {
      bodyPayload.systemInstruction = {
        parts: [{ text: systemMsg.content }],
      };
    }

    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyPayload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch from Gemini API');
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Standardized response format compatible with frontend
    return res.status(200).json({
      choices: [
        {
          message: {
            role: 'assistant',
            content: replyText,
          },
        },
      ],
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
