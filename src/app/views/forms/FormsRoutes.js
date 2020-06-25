import { MatxLoadable } from "matx";

const BasicForm = MatxLoadable({
  loader: () => import("./BasicForm")
});

const BasicFormLeader = MatxLoadable({
  loader: () => import("./BasicFormLeader")
});

const StartFormLeader = MatxLoadable({
  loader: () => import("./Start")
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

const formsRoutes = [
  {
    path: "/forms/basic",
    component: BasicForm
  },
  {
    path: "/start/basicleader",
    component: BasicFormLeader
  },
  {
    path: "/start",
    component: StartFormLeader
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

export default formsRoutes;
