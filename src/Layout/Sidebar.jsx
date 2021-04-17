// import { faAccessibleIcon, faAppStore } from "@fortawesome/free-brands-svg-icons";
// import {
//     faCog,
//     faHome,
//     faListAlt,
//     faLongArrowAltDown,
//     faTable,
//     faUserAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import "./Sidebar.css";

const toggleStyle = {
    background: "var(--bs-dark)",
    border: "0",
    color: "#fff"
}


export default function Sidebar({ handleTheme, handleLogout, toggleSidebar }) {
    const location = useLocation();

    const url = useRouteMatch({ path: location.pathname, exact: true }).url;
    const isActive = (path) => path === url;
    const routes = [
        {
            name: "Conference Management",
            path: "/",
            icon: 'fa fa-home',
        },
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: 'fas fa-dice-d6',
        },
        {
            name: "Order List",
            path: "/dashboard/order-list",
            icon: "fas fa-list-ol",
        }, {
            name: "Make Admin",
            path: "/dashboard/make-admin",
            icon: "fad fa-user-plus"
        },
        {
            name: "Add a Service",
            path: "/dashboard/add-service",
            icon: "far fa-plus-square",
        },

        {
            name: "Management Service",
            path: "/dashboard/manage-services",
            icon: "fas fa-list-ul",
        },

        {
            name: "Review",
            path: "/dashboard/manage-review",
            icon: "far fa-star",
        },
        {
            name: "Toggle Theme color",
            path: "#",
            icon: "fas fa-tachometer-alt",
            type: 'button',
            handler: handleTheme
        },
        {
            name: "Toggle Sidebar",
            path: "#",
            icon: "fas fa-toggle-off",
            type: 'button',
            handler: toggleSidebar
        },
        {
            name: "Logout",
            path: "#",
            type: 'button',
            handler: handleLogout,
            icon: "fas fa-sign-out-alt",
            hasDivider: true
        }
    ];
    return (
        <>
            <nav className="navbar navbar-dark d-md-none" >
                <div className="container-fluid">

                    <Link
                        to="/"
                        className={`list-group-item bg-transparent border-0 text-white navlink`}
                        aria-current="true"
                    >
                        <span><img src="/logo64.png" alt="Logo" className="w-25" /></span>
                        <strong className="ms-2"> Conference Dasboard </strong>
                    </Link>

                    <button
                        className="navbar-toggler "
                        style={toggleStyle}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebar"
                        aria-controls="sidebar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-stream"></i>
                    </button>
                </div>
            </nav>
            <div id="sidebar">
                {routes.map((route, i) => (
                    <Link
                        key={i}
                        to={route.path}
                        className={`list-group-item bg-transparent border-0 text-white navlink 
                            ${isActive(route.path) && "navactive"}
                            ${route.hasDivider && "mt-md-5"}`}
                        aria-current="true"
                        onClick={() => route.type && route.handler()}
                    >
                        {/* <FontAwesomeIcon icon={route.icon} /> */}
                        <i className={route.icon}></i>
                        <strong className="ms-2"> {route.name} </strong>
                    </Link>
                ))
                }

            </div >
        </>
    );
}
