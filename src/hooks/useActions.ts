// //!хук для того чтобы постоянно не вызывать useDispatch в каждой компоненте

// import { useMemo } from "react";
// import { useDispatch } from "react-redux";
// import { bindActionCreators } from "@reduxjs/toolkit";
// // import favoritesSlice from "../store/favorites/favorites.slice";//для синхронных экшенов
// import * as userActions from "../store/user/user.actions"; //для ассинхронных экшенов

// const rootActions = {
//     ...userActions //для ассинхронных экшенов
// };

// export const useActions = () => {
//     const dispatch = useDispatch();

//     return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
// };
