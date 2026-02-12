const nepseApiUrl = require('../../config/nepseApiUrl');

/**
 * Fetches real-time market status from Nepal Stock API
 */
const getMarketStatus = async (req, res) => {
  try {
    const response = await fetch(`${nepseApiUrl.apiUrl}/live/api/v1/nepselive/market-status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ success: false, message: data.message || "Failed to fetch market status" });
    }

    return res.json({ success: true, data: { isOpen: data.isOpen === "OPEN", updatedAt: data.asOf } });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Unknown error" });
  }
};


/**
 * Fetches live indices(like NEPSE, Sensitive, Float, Companies) data from Nepal Stock API
 */
const getLiveMarketData = async (req, res) => {
  try {
    const response = await fetch(`${nepseApiUrl.apiUrl}/live/api/v2/nepselive/home-page-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      return res.status(500).json({ success: false, message: data.message || "Failed to fetch live indices" });
    }

    return res.json({ 
      success: true, 
      data: { 
        indices: data.indices, 
        subIndices: data.subIndices, 
        listedCompanies: data.liveCompanyData, 
        topGainers: data.topGainers,
        topLosers: data.topLosers,
        topTraded: data.topTradedShares,
        topTransaction: data.topTransaction,
        topTurnover: data.topTurnover,
        marketSummary: data.marketSummary,
        stockSummary: data.stockSummary,
      } 
    });


  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Unknown error" });
  }

}


module.exports = {
  getMarketStatus,
  getLiveMarketData,
};