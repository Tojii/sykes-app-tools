import { MatxLoadable } from "matx";

const BasicForm = MatxLoadable({
  loader: () => import("./BasicForm")
});

const LLSForm = MatxLoadable({
  loader: () => import("./lss/LeadershipSatisfactionForm")
});

const StartFormLeader = MatxLoadable({
  loader: () => import("./lss/ThankYou")
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
    path: "/lss/form",
    component: LLSForm
  },
  {
    path: "/lss",
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

export default hrRoutes;
