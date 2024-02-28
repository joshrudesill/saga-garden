import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

const plantList = (state = [], action) => {
  switch (action.type) {
    case "ADD_PLANT":
      return [...state, action.payload];
    case "REFRESH_PLANTS":
      return action.payload;
    default:
      return state;
  }
};

function* get() {
  try {
    const r = yield axios.get("/api/plants");
    yield put({ type: "REFRESH_PLANTS", payload: r.data });
  } catch (e) {
    console.error(e);
  }
}
function* post(action) {
  try {
    const r = yield axios.post("/api/plants", { ...action.payload });
    yield put({ type: "FETCH_PLANT" });
  } catch (e) {
    console.error(e);
  }
}
function* remove(action) {
  try {
    const r = yield axios.delete(`/api/plants/${action.payload}`);
    yield put({ type: "FETCH_PLANT" });
  } catch (e) {
    console.error(e);
  }
}
function* rootSaga() {
  yield takeLatest("FETCH_PLANT", get);
  yield takeLatest("POST_PLANT", post);
  yield takeLatest("DELETE_PLANT", remove);
}
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger)
);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
sagaMiddleware.run(rootSaga);
export default store;
