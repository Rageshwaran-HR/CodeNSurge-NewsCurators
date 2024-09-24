import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import NewsDetails from "./pages/NewsDetails";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import CardContainer from "./components/CardContainer";
import NewsVideoContainer from "./components/NewsVideoContainer";
import NewsList from "./components/newslist";
import Footer from "./components/Footer"; // Ensure this matches exactly
import "./Styles/Layout.css"; // Ensure this includes the styles for the floating widget
import WeatherDetails from "./components/WeatherData";
import MarketChartWidget from "./components/stockmarket";
import Cookies from "universal-cookie";
import Pref from "./components/Pref";

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
      <CardContainer category={category} />
      <div className="layout-container">
        <NewsList category={category} />
        <NewsVideoContainer category={category} />
      </div>
    </>
  );
};

function App() {
  const cookie = new Cookies();
  const [isPrf, setPrf] = useState(cookie.get("Pref"));
  const nav = "";

  // function googleTranslateElementInit() {
  //     new google.translate.TranslateElement({
  //         pageLanguage: 'ar',
  //         layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  //     }, 'google_translate_element');
  // }

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
        <Navbar nav={nav} />
        <main className="main-content relative">
          {!isPrf ? (
            // Registeration page
            <Pref setPrf={setPrf} />
          ) : (
            <div></div>
          )}
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
                  <CardContainer />
                  <div className="layout-container">
                    <NewsList />
                    <NewsVideoContainer category="top-news" />
                  </div>
                </>
              }
            />
            <Route path="/:category" element={<CategoryPage />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route
              path="/videos"
              element={<NewsVideoContainer category="videos" />}
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
