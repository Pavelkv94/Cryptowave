export interface IUserLogin {
    email: string;
    password: string;
    tg_nickname?: string;
}

export interface IUser {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        id: string;
        isActivated: boolean;
        tg_nickname: string;
        avatar_url: string;
    };
}

export interface IUserHistoryItem {
    coin: string;
    date: string;
    note: string;
    operation: string;
    price_per_coin: string;
    quantity: string;
    tg_nickname: string;
    total: string;
    user_id: string;
    __v: number;
    _id: string;
}
