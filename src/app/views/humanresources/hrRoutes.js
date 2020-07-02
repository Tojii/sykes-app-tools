import { MatxLoadable } from "matx";

const BasicForm = MatxLoadable({
  loader: () => import("./BasicForm")
});

const EditorForm = MatxLoadable({
  loader: () => import("./EditorForm")
});

const WizardForm = MatxLoadable({
  loader: () => import("./WizardForm")
});

const UploadForm = MatxLoadable({
  loader: () => import("./UploadForm")
});

const hrRoutes = [
  {
    path: "/forms/basic",
    component: BasicForm
  },
  {
    path: "/forms/editor",
    component: EditorForm
  },
  {
    path: "/forms/upload",
    component: UploadForm
  },
  {
    path: "/forms/wizard",
    component: WizardForm
  }
];

export default hrRoutes;
