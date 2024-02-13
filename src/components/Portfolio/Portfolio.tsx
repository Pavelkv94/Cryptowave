import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import "./Portfolio.scss";
import WalletTab from "./WalletTab/WalletTab";
import TelegramBotTab from "./TelegramBotTab/TelegramBotTab";

const Portfolio = () => {
    // const user_id = JSON.parse(localStorage.getItem("user"))?.id;

    // const { data: user, isFetching } = useGetUserQuery(user_id);

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
