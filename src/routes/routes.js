import { lazy } from "react";
import MyCheckoutForm from "../components/MyCheckoutForm.component";

const DashboardPage = lazy(() => import(/*webpackChunkName:'Dashboard/DashboardPage'*/'../pages/dashboard'));
const OrderList = lazy(() => import(/*webpackChunkName:'Dashboard/OrderList'*/'../pages/dashboard/order-list'));
const MakeAdmin = lazy(() => import(/*webpackChunkName:'Dashboard/MakeAdmin'*/'../pages/dashboard/make-admin.jsx'));
const AddService = lazy(() => import(/*webpackChunkName:'Dashboard/AddService'*/'../pages/dashboard/add-service.page'));
const ManageService = lazy(() => import(/*webpackChunkName:'Dashboard/ManageService'*/'../pages/dashboard/manage-service'));
const CreateReview = lazy(() => import(/*webpackChunkName:'Dashboard/CreateReview'*/'../pages/dashboard/create-review.page'));
const ManageReviews = lazy(() => import(/*webpackChunkName:'Dashboard/ManageReviews'*/'../pages/dashboard/manage-review.page'));

const Home = lazy(() => import(/*webpackChunkName:'App/Home' */'../pages/Home'));
const SpeakersPage = lazy(() => import(/*webpackChunkName:'App/SpeakersPage' */'../pages/speakers.page'));
const ServicesPage = lazy(() => import(/*webpackChunkName:'App/ServicesPage' */'../pages/services.page'));
const ServiceSinglePage = lazy(() => import(/*webpackChunkName:'App/ServiceSinglePage' */'../pages/serviceSingle.page'));

const ContactPage = lazy(() => import(/*webpackChunkName:'App/ContactPage' */'../pages/contact.page'));
const Login = lazy(() => import(/*webpackChunkName:'App/Login' */'../pages/login.page'));
const Signup = lazy(() => import(/*webpackChunkName:'App/Signup' */'../pages/signup.page'));
const NotFound = lazy(() => import(/*webpackChunkName:'App/404' */'../pages/NotFound'));

const routes = [
    { path: '/dashboard', authorization: 'private', exact: true, component: DashboardPage },
    { path: '/dashboard/add-service', authorization: 'private', exact: true, component: AddService },
    { path: '/dashboard/manage-services', authorization: 'private', exact: true, component: ManageService },
    { path: '/dashboard/order-list', authorization: 'private', exact: true, component: OrderList },
    { path: '/dashboard/make-admin', authorization: 'private', exact: true, component: MakeAdmin },
    { path: '/dashboard/create-review', authorization: 'private', exact: true, component: CreateReview },
    { path: '/dashboard/manage-review', authorization: 'private', exact: true, component: ManageReviews },

    { path: '/services', authorization: 'private', exact: true, component: ServicesPage },
    { path: '/services/:serviceId', authorization: 'private', exact: true, component: ServiceSinglePage },
    { path: '/checkout/:serviceId', authorization: 'private', exact: true, component: MyCheckoutForm },
    { path: '/contact', exact: true, component: ContactPage },
    { path: '/speakers', authorization: 'private', exact: true, component: SpeakersPage },
    { path: '/login', exact: true, authorization: "IfAuthRedirectBack", component: Login },
    { path: '/signup', exact: true, authorization: "IfAuthRedirectBack", component: Signup },
    { path: ['/', '/home'], exact: true, component: Home },
    { path: '*', exact: true, component: NotFound },
];

export default routes;