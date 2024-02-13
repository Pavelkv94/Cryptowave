import "./App.css";
import Portfolio from "./components/Portfolio/Portfolio";
import { Navbar, Footer, Homepage, Cryptocurrencies, News, CryptoDetails, Exchanges } from "./components/index";
import { Route, Routes } from "react-router-dom";



function App() {

    return (
        <div className="app" >
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
                        <Route element={<div style={{height: "calc(100vh - 150px)"}}>empty</div>} path="*" />
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
