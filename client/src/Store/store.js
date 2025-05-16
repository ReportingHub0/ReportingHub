import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice";
import issueReducer from "../Features/IssueSlice";
import staffReducer from "../Features/StaffSlice";
import adminReducer from "../Features/AdminSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { reset as resetUsers } from "../Features/UserSlice";
import { reset as resetIssues } from "../Features/IssueSlice";
import { reset as resetStaff } from "../Features/StaffSlice";
import { reset as resetAdmin } from "../Features/AdminSlice";

const persistConfig = {
  key: "reduxstore",
  storage,
};

const resetStore = () => {
  store.dispatch(resetUsers());
  store.dispatch(resetStaff());
  store.dispatch(resetIssues());
  store.dispatch(resetAdmin());
};
const rootReducer = combineReducers({
  users: usersReducer,
  issues: issueReducer,
  staff: staffReducer,
  admin: adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});

const persistore = persistStore(store);

export { store, persistore, resetStore };
