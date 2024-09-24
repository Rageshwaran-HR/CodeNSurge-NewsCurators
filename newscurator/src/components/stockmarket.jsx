import React, { useEffect } from "react";

const MarketChartWidget = () => {
  useEffect(() => {
    // Load the external widget script
    const script = document.createElement("script");
    script.src = "https://widget.finlogix.com/Widget.js";
    script.async = true;
    script.onload = () => {
      // Initialize the widget once the script has been loaded
      if (window.Widget) {
        window.Widget.init({
          widgetId: "2b7ced59-aa60-478e-8c29-0a71e6f7bc99",
          type: "MarketChart",
          language: "en",
          ranges: ["1D", "1M", "3M", "1Y", "5Y", "ALL"],
          custom: {
            subclasses: [
              {
                subtitle: "Forex",
                symbolPairs: [
                  { symbolId: "19", symbolName: "EUR/USD" },
                  { symbolId: "5", symbolName: "AUD/USD" },
                  { symbolId: "25", symbolName: "GBP/USD" },
                ],
              },
              {
                subtitle: "Commodities",
                symbolPairs: [
                  { symbolId: "44", symbolName: "XAU/USD" },
                  { symbolId: "43", symbolName: "XAG/USD" },
                  { symbolId: "45", symbolName: "WTI" },
                  { symbolId: "70", symbolName: "BRENT" },
                ],
              },
              {
                subtitle: "Cryptocurrency",
                symbolPairs: [
                  { symbolId: "66", symbolName: "BTC/USD" },
                  { symbolId: "65", symbolName: "BCH/USD" },
                  { symbolId: "67", symbolName: "ETH/USD" },
                  { symbolId: "68", symbolName: "LTC/USD" },
                ],
              },
              {
                subtitle: "Indices",
                symbolPairs: [
                  { symbolId: "52", symbolName: "SP500" },
                  { symbolId: "51", symbolName: "DJ30" },
                  { symbolId: "54", symbolName: "JP225" },
                  { symbolId: "53", symbolName: "GER30" },
                ],
              },
              {
                subtitle: "Stocks",
                symbolPairs: [
                  { symbolId: "10006", symbolName: "Amazon" },
                  { symbolId: "10007", symbolName: "Apple" },
                  { symbolId: "10014", symbolName: "Tesla" },
                  { symbolId: "20001", symbolName: "BlackRock" },
                ],
              },
              {
                subtitle: "ETFs",
                symbolPairs: [
                  { symbolId: "60002", symbolName: "NUGT" },
                  { symbolId: "40001", symbolName: "ACWI" },
                  { symbolId: "40002", symbolName: "BJK" },
                  { symbolId: "50001", symbolName: "BetaShares" },
                ],
              },
              {
                subtitle: "Futures",
                symbolPairs: [],
              },
            ],
          },
          isAdaptive: true,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return;
};

export default MarketChartWidget;