const nepseApiUrl = require('../../config/nepseApiUrl');

/**
 * Fetches IPOs details form API
 */
const getIPOs = async (req, res) => {
  try {
    
    const { pageSize, type, forValue } = req.body;

    const response = await fetch(`${nepseApiUrl.apiUrl}/data/api/v1/public-offering?size=${pageSize}&type=${type}&for=${forValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      return res.status(500).json({ success: false, message: data.message || "Failed to fetch IPOs" });
    }

    return res.json({ success: true, data: data.data.content });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Unknown error" });
  }
};

module.exports = {
  getIPOs,
};