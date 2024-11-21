import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies/Cryptocurrencies";
import CryptoDetails from "./components/Cryptocurrencies/CryptoDetails";
import Exchanges from "./components/Exchanges/Exchanges";
import News from "./components/News/News";
import Portfolio from "./components/Portfolio/Portfolio";
import { useGetMeQuery } from "./store/api/authApi";
import { useEffect } from "react";
import { useAppSelector } from "./store/store";
import Confirmation from "./components/Confirmation/Confirmation";

function App() {
    const accessToken = localStorage.getItem("token");
    const isAuth: boolean = useAppSelector((state) => state.user.isAuth);

    const { isFetching: isFetchingMe, refetch } = useGetMeQuery(null, { skip: !accessToken });

    useEffect(() => {
        isAuth && refetch();
    }, [isAuth]);

    return (
        <div className="app">
            <Navbar isFetchingMe={isFetchingMe} />
            <div className="main">
                <div className="routes">
                    <Routes>
                        <Route element={<Homepage />} path="/" />
                        <Route element={<Confirmation />} path="/confirmation" />
                        <Route element={<Cryptocurrencies />} path="/cryptocurrencies" />
                        <Route element={<CryptoDetails />} path="/cryptocurrencies/:coinId" />
                        <Route element={<News />} path="/news" />
                        <Route element={<Exchanges />} path="/exchanges" />
                        <Route element={<Portfolio isFetching={isFetchingMe}/>} path="/portfolio" />
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
