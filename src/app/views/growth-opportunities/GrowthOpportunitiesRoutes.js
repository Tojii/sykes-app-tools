import { MatxLoadable } from "matx";

const GrowthOpportunities = MatxLoadable({
  loader: () => import("./growth-opportunities")
});

const OpportunityDetail = MatxLoadable({
  loader: () => import("./opportunity-detail")
});

const Apply = MatxLoadable({
  loader: () => import("./apply")
});

const Metrics = MatxLoadable({
  loader: () => import("./metrics")
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
    component: Apply
  },
  {
    exact: true,
    path: "/my-metrics",
    component: Metrics
  }
];

export default growthOpportunitiesRoutes;