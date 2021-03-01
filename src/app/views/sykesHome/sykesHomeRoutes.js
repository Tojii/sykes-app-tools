import { MatxLoadable } from "matx";

const Home = MatxLoadable({
    loader: () => import("./Home")
});

const settings = {
    likeDislikeButtons: {show: false } 
}

const sykesHomeRoutes = [
    {
        path: "/Inicio",
        component: Home,
        settings
    },
];

export default sykesHomeRoutes
