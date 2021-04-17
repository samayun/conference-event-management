import { NavLink } from "react-router-dom";

export default function Navbar() {
    const links = [
        {
            path: '/dashboard',
            title: 'Dashboard'
        },
        {
            path: '/speakers',
            title: 'Speakers'
        },
        {
            path: '/events',
            title: 'Events'
        },
        {
            path: '/services',
            title: 'Services'
        },
        {
            path: '/contact',
            title: 'Contact Us'
        },
        {
            path: '/login',
            title: 'Login'
        },
        {
            path: '/signup',
            title: 'Sign Up'
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
                                links.map(link => (
                                    <li
                                        key={link.path}
                                        class="nav-item">
                                        <NavLink
                                            class="nav-link" aria-current="page"
                                            to={link.path}>
                                            {link.title}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </nav>
        </div>
    );
}
