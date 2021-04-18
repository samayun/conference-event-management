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
import { useEffect } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
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

    const { UserIsAdmin, currentUser } = useAuth()

    useEffect(() => {

    })
    const routes = [
        {
            name: "Conference Management",
            path: "/",
            icon: 'fa fa-home',
            condition: true

        },
        {
            path: "#",
            title: currentUser.name && currentUser.name,
            type: 'img',
            condition: !!currentUser.email
        },
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: 'fas fa-dice-d6',
            condition: true
        },
        {
            name: UserIsAdmin ? "Order List" : "My Orders",
            path: "/dashboard/order-list",
            icon: "fas fa-list-ol",
            condition: true
        }, {
            name: "Make Admin",
            path: "/dashboard/make-admin",
            icon: "fad fa-user-plus",
            condition: !!UserIsAdmin
        },
        {
            name: "Add a Service",
            path: "/dashboard/add-service",
            icon: "far fa-plus-square",
            condition: UserIsAdmin
        },

        {
            name: "Management Service",
            path: "/dashboard/manage-services",
            icon: "fas fa-list-ul",
            condition: UserIsAdmin
        },

        {
            name: "Create Review",
            path: "/dashboard/create-review",
            icon: "far fa-star text-warning",
            condition: !UserIsAdmin
        },
        {
            name: "My Reviews",
            path: "/dashboard/manage-review",
            icon: "fas fa-star text-warning",
            condition: !UserIsAdmin
        },
        {
            name: "Toggle Theme color",
            path: "#",
            icon: "fas fa-tachometer-alt text-primary",
            type: 'button',
            handler: handleTheme,
            condition: true
        },
        {
            name: "Toggle Sidebar",
            path: "#",
            icon: "fas fa-toggle-off text-success",
            type: 'button',
            handler: toggleSidebar,
            condition: true
        },
        {
            name: "Logout",
            path: "#",
            type: 'button',
            handler: handleLogout,
            icon: "fas fa-sign-out-alt",
            hasDivider: true,
            condition: true
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

                {routes.map((route, i) => {
                    return route.condition && (
                        <Link
                            key={i}
                            to={route.path}
                            className={`list-group-item bg-transparent border-0 text-white navlink 
                            ${isActive(route.path) && "navactive"}
                            ${route.hasDivider && "mt-md-5"}`}
                            aria-current="true"
                            onClick={() => route.type === 'button' && route.handler()}
                        >
                            {
                                route.type === 'img' && (
                                    <>
                                        <img src={currentUser.photoURL || '/user.png'} alt={currentUser.name} className="img-sm img-circle " />
                                        <strong>{currentUser.name}</strong>
                                    </>
                                )
                            }
                            <i className={route.icon}></i>
                            <strong className="ms-2"> {route.name} </strong>
                        </Link>
                    )
                })
                }

            </div >
        </>
    );
}
