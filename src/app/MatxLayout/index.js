import {MatxLoadable} from "matx";

const Layout1 = MatxLoadable({
  loader: () => import("./Layout1/Layout1")
});
const Layout2 = MatxLoadable({
  loader: () => import("./Layout2/Layout2")
});

export const MatxLayouts = {
  layout1: Layout1,
  layout2: Layout2
}