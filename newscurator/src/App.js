import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Ensure this matches exactly
import "./Styles/Layout.css"; // Ensure this includes the styles for the floating widget
import WeatherDetails from "./components/WeatherData";
import MarketChartWidget from "./components/stockmarket";
import Carousel from "./components/Carousel";

const CategoryPage = () => {
  const { category } = useParams();
  return (
    <>
      <Carousel />
      <div
        id="ww_c289b208976c5"
        v="1.3"
        loc="auto"
        a='{"t":"ticker","lang":"en","sl_lpl":1,"ids":[],"font":"Times","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'
      >
        <a
          href="https://weatherwidget.org/"
          id="ww_c289b208976c5_u"
          target="_blank"
          rel="noopener noreferrer"
        >
          Weather widget html
        </a>
      </div>
      <script
        async
        src="https://app3.weatherwidget.org/js/?id=ww_c289b208976c5"
      ></script>
    </>
  );
};

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app3.weatherwidget.org/js/?id=ww_c289b208976c5";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Carousel />
                  <div
                    style={{ "margin-bottom": "200px" }}
                    id="ww_c289b208976c5"
                    v="1.3"
                    loc="auto"
                    a='{"t":"ticker","lang":"en","sl_lpl":1,"ids":[],"font":"Times","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'
                  >
                    <a
                      href="https://weatherwidget.org/"
                      id="ww_c289b208976c5_u"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Weather widget html
                    </a>
                  </div>
                  <div className="layout-container"></div>
                </>
              }
            />
          </Routes>
        </main>
        <WeatherDetails />
        <div class="finlogix-containers">
          <div class="finlogix-container"></div>
        </div>
        <div hidden>
          <MarketChartWidget />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
