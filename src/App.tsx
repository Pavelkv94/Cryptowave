import "./App.css";
import { Navbar, Footer, Homepage, Cryptocurrencies, News, CryptoDetails, Exchanges } from "./components/index";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";
import { Route, Routes } from "react-router-dom";


const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});



function App() {
    const { t } = useTranslation();

    return (
        <div className="app" >
            <Navbar t={t}/>
            <div className="main">
                <div className="routes">
                    <Routes>
                        <Route element={<Homepage />} path="/" />
                        <Route element={<Cryptocurrencies />} path="/cryptocurrencies" />
                        <Route element={<CryptoDetails />} path="/cryptocurrencies/:id" />
                        <Route element={<News />} path="/news" />
                        <Route element={<Exchanges />} path="/exchanges" />
                        <Route element={<div>empty</div>} path="*" />
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
