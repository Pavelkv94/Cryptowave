import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import "./Portfolio.scss";
import WalletTab from "./WalletTab/WalletTab";
import TelegramBotTab from "./TelegramBotTab/TelegramBotTab";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../Slices/userSlice";

const Portfolio = () => {


    // const user = useSelector(selectUser); // Получение пользователя из хранилища
    // console.log(user);

    return (
        <div className="portfolio-wrapper">
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Wallet</Tab>
                    <Tab>Telegram Bot</Tab>
                </TabList>
                <TabPanels>
                    <WalletTab />
                    <TelegramBotTab />
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default Portfolio;
