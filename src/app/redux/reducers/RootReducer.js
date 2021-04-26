import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import LSSReducer from "./LSSReducer";
import GrowthReducer from "./GrowthOpportunityReducer";
import MetricsReducer from "./MetricsReducer";
import ApplyReducer from "./ApplyReducer";
//import ReembolsosEducativosReducer from "./ReembolsoEducativoReducer";
import RaftReducer from "./RaftReducer";
import EducationalReimbursementReducer from "./EducationalReimbursementReducer";
import CommonReducer from "./CommonReducer";
import { persistStore } from 'redux-persist'
import CampaignReducer from "./CampaignReducer";
import BenefitReducer from "./BenefitsReducer";
import BenefitsDiscountReducer from "./BenefitsDiscountReducer";
import BenefitsCategoryReducer from "./BenefitsCategoryReducer";
import BenefitsLinksReducer from "./BenefitsLinksReducer";
import OrderReducer from "./OrderReducer";
import LocationReducer from "./LocationReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  lss: LSSReducer,
  raft: RaftReducer,
  reimbursement: EducationalReimbursementReducer,
  common: CommonReducer,
  campaign: CampaignReducer,
  benefit: BenefitReducer,
  discount: BenefitsDiscountReducer,
  category: BenefitsCategoryReducer,
  links: BenefitsLinksReducer,
  order: OrderReducer,
  locations: LocationReducer,
  growth: GrowthReducer,
  metrics: MetricsReducer,
  apply: ApplyReducer,
});

export default RootReducer;