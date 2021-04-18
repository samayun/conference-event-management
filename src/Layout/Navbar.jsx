import { NavLink, useLocation, useRouteMatch } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { signOut } from "../firebase";

export default function Navbar() {
    const { currentUser, setError } = useAuth();
    const location = useLocation();
    const url = useRouteMatch({ path: location.pathname, exact: true }).url


    const handleSignOut = async () => {
        try {
            await signOut();
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("isAdmin");
            // No need to manually route change cz AuthContext will reset state & privateRoute will change routing
            // history.push('/login');
        } catch (error) {
            setError(error.message)
        }
    }
    const links = [
        {
            path: '/dashboard',
            title: 'Dashboard',
            condition: !!currentUser.email
        },
        {
            path: '/speakers',
            title: 'Speakers',
            condition: !!currentUser.email
        },
        {
            path: '/services',
            title: 'Services',
            condition: !!currentUser.email
        },
        {
            path: '/contact',
            title: 'Contact Us',
            condition: true
        },

        {
            path: "#",
            title: "Logout",
            icon: "fas fa-toggle-off",
            type: 'button',
            handler: handleSignOut,
            condition: !!currentUser.email
        },

        {
            path: "#",
            title: currentUser.name && currentUser.name,
            type: 'img',
            condition: !!currentUser.email
        },
        {
            path: '/login',
            title: 'Login',
            condition: !currentUser.email
        },
        {
            path: '/signup',
            title: 'Sign Up',
            condition: !currentUser.email
        },
    ]

    return (
        <div className="container">
            <nav class="navbar navbar-expand-md navbar-light">
                <div class="container-fluid">
                    <NavLink class="navbar-brand" to="/">
                        <img src="/logo.png" className="w-25 mr-0" alt="Conferance" />  Conferance
                        </NavLink>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar"
                        aria-controls="navbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-align-right"></i>
                    </button>
                    <nav class="collapse navbar-collapse" id="navbar">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                links.map(link => {
                                    return link.condition && (
                                        <li
                                            onClick={() => link.type === 'button' && link.handler()}
                                            key={link.path}
                                            class={`nav-item   ${url === link.path && 'navactive'}`}>
                                            <NavLink
                                                class={`nav-link`} aria-current="page"
                                                to={link.path}>
                                                <i className={link.icon}></i>
                                                {
                                                    link.type === 'img' && (
                                                        <img src={currentUser.photoURL || '/user.png'} alt={currentUser.name} className="img-sm img-circle " />
                                                    )
                                                }
                                                <strong>{link.title}</strong>
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </nav>
        </div>
    );
}
