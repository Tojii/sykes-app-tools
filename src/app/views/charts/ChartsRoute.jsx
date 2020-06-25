import {MatxLoadable} from "matx";

const AppEchart = MatxLoadable({
  loader: () => import("./echarts/AppEchart")
});

const AppRechart = MatxLoadable({
  loader: () => import("./recharts/AppRechart")
});

const AppVictoryChart = MatxLoadable({
  loader: () => import("./victory-charts/AppVictoryChart")
});

const AppReactVis = MatxLoadable({
  loader: () => import("./react-vis/AppReactVis")
});

const chartsRoute = [
  {
    path: "/charts/echarts",
    component: AppEchart
  },
  {
    path: "/charts/recharts",
    component: AppRechart
  },
  {
    path: "/charts/victory-charts",
    component: AppVictoryChart
  },
  {
    path: "/charts/react-vis",
    component: AppReactVis
  }
];

export default chartsRoute;
