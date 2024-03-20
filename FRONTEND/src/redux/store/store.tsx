import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user/userSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// 세션 스토리지에 redux 저장하기 위한 설정, blacklist에는 저장하지 않을 reducer, whitelist에는 저장할 reducer를 넣는다.
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [],
};

// redux store 생성
const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// redux store에 persist 적용
const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
