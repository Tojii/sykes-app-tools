import { MatxLoadable } from "matx";

const GrowthOpportunities = MatxLoadable({
  loader: () => import("./growth-opportunities")
});

const OpportunityDetail = MatxLoadable({
  loader: () => import("./opportunity-detail")
});

const UserForm = MatxLoadable({
  loader: () => import("./user-form")
});

const growthOpportunitiesRoutes = [
  {
    exact: true,
    path: "/growth-opportunities",
    component: GrowthOpportunities
  },
  {
    exact: true,
    path: "/growth-opportunities/:opp_id",
    component: OpportunityDetail
  },
  {
    exact: true,
    path: "/growth-opportunities/:opp_id/apply",
    component: UserForm
  }
];

export default growthOpportunitiesRoutes;