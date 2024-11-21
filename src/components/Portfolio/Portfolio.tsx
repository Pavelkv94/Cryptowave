import { Spinner, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import "./Portfolio.scss";
import WalletTab from "./WalletTab/WalletTab";
import TelegramBotTab from "./TelegramBotTab/TelegramBotTab";
import { useAppSelector } from "../../store/store";
import { IUser } from "../../types/user.types";
import AccessForbidden from "./AccessForbidden";

const Portfolio = ({ isFetching }: { isFetching: boolean }) => {
    const user: IUser | null = useAppSelector((state) => state.user.userData);

    return (
        <div className="portfolio-wrapper">
            {user ? (
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
            ) : isFetching ? (
                <div className="spinner">
                    <Spinner size="lg" color="#00A0DC" />
                </div>
            ) : (
                <AccessForbidden />
            )}
        </div>
    );
};

export default Portfolio;
