import { lazy } from "react";
import ContactPage from "../pages/contact.page";
import Events from "../pages/events";
import ServicesPage from "../pages/services.page";
import SpeakersPage from "../pages/speakers";

const Home = lazy(() => import(/*webpackChunkName:'App/Home' */'../pages/Home'));
const Login = lazy(() => import(/*webpackChunkName:'App/Login' */'../pages/login'));
const Signup = lazy(() => import(/*webpackChunkName:'App/Signup' */'../pages/signup'));
const NotFound = lazy(() => import(/*webpackChunkName:'App/404' */'../pages/NotFound'));

const routes = [

    { path: '/services', exact: true, component: ServicesPage },
    { path: '/contact', exact: true, component: ContactPage },
    { path: '/events', exact: true, component: Events },
    { path: '/speakers', exact: true, component: SpeakersPage },
    { path: '/login', exact: true, component: Login },
    { path: '/signup', exact: true, component: Signup },
    { path: ['/', '/home'], exact: true, component: Home },
    { path: '*', exact: true, component: NotFound },
];

export default routes;