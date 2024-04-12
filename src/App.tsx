import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies/Cryptocurrencies";
import CryptoDetails from "./components/Cryptocurrencies/CryptoDetails";
import Exchanges from "./components/Exchanges/Exchanges";
import News from "./components/News/News";
import { useEffect } from "react";
import { useActions } from "./hooks/useActions";
import Portfolio from "./components/Portfolio/Portfolio";

function App() {
    const { checkAuth } = useActions();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkAuth();
        }
      //   if (localStorage.getItem("user")) {
      //     checkAuth();
      // }
    }, []);

    return (
        <div className="app">
            <Navbar />
            <div className="main">
                <div className="routes">
                    <Routes>
                        <Route element={<Homepage />} path="/" />
                        <Route element={<Cryptocurrencies />} path="/cryptocurrencies" />
                        <Route element={<CryptoDetails />} path="/cryptocurrencies/:coinId" />
                        <Route element={<News />} path="/news" />
                        <Route element={<Exchanges />} path="/exchanges" />
                        <Route element={<Portfolio />} path="/portfolio" />
                        <Route
                            element={
                                <div style={{ height: "calc(100vh - 150px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    Page not found
                                </div>
                            }
                            path="*"
                        />
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
