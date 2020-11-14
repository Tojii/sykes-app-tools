import { MatxLoadable } from "matx";

const GrowthOpportunities = MatxLoadable({
  loader: () => import("./growth-opportunities")
});

const OpportunityDetail = MatxLoadable({
  loader: () => import("./opportunity-detail")
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
  }
];

export default growthOpportunitiesRoutes;