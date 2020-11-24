import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import MantenimientoReducer from "./MantenimientoReducer";
import LSSReducer from "./LSSReducer";
import growthReducer from "./GrowthOpportunityReducer";
import metricsReducer from "./MetricsReducer";
import applyReducer from "./ApplyReducer";
import { persistStore } from 'redux-persist'


const appReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  mantenimientos: MantenimientoReducer,
  lss: LSSReducer,
  growthReducer,
  metricsReducer,
  applyReducer,
});

const RootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    // for all keys defined in your persistConfig(s)
    // persistStore.removeItem('persist:root')
    // storage.removeItem('persist:otherKey')
    state = undefined;
  }
  return appReducer(state, action)
}

export default RootReducer;
