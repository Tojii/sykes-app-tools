import { MatxLoadable } from "matx";

const GrowthOpportunities = MatxLoadable({
  loader: () => import("./growth-opportunities")
});

const OpportunityDetail = MatxLoadable({
  loader: () => import("./opportunity-detail")
});

const ApplySteps = MatxLoadable({
  loader: () => import("./apply-steps")
});

const Metrics = MatxLoadable({
  loader: () => import("./metrics")
});

const settings = {
  activeLayout: "layout1",
  likeDislikeButtons: { show: true }
};

const growthOpportunitiesRoutes = [
  {
    exact: true,
    path: "/growth-opportunities",
    component: GrowthOpportunities,
    settings
  },
  {
    exact: true,
    path: "/growth-opportunities/:opp_id",
    component: OpportunityDetail,
    settings
  },
  {
    exact: true,
    path: "/growth-opportunities/:opp_id/apply",
    component: ApplySteps,
    settings
  },
  {
    exact: true,
    path: "/my-metrics",
    component: Metrics,
    settings
  }
];

export default growthOpportunitiesRoutes;