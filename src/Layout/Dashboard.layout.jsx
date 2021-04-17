import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
    // let getTheme = localStorage.getItem("theme") || 'bg-hero2'
    const [theme, setTheme] = useState({
        color: "bg-hero2",
        sidebar: 'right'
    });

    useEffect(() => {

        if (localStorage.getItem('theme')) {
            let obj = JSON.parse(localStorage.getItem('theme'));
            setThemeStoarge(obj)
            setTheme(obj);
            console.log(obj)
        }

    }, []);
    const setThemeStoarge = obj => {
        localStorage.setItem('theme', JSON.stringify(obj))
    }
    const toggleTheme = () => {
        console.log(theme)
        if (theme.color && theme.color === "bg-hero2") {
            let obj = {
                color: "bg-hero",
                sidebar: theme.sidebar
            }
            setThemeStoarge(obj);
            setTheme(obj);
        } else if (theme.color && theme.color === "bg-hero") {
            let obj = {
                color: "bg-hero2",
                sidebar: theme.sidebar
            }
            setThemeStoarge(obj);
            setTheme(obj); console.log(obj)
        }

    }
    const toggleSidebar = () => {
        if (theme.sidebar && theme.sidebar === "right") {
            let obj = {
                color: theme.color,
                sidebar: 'left'
            }
            setThemeStoarge(obj);
            setTheme(obj);
        } else if (theme.sidebar && theme.sidebar === "left") {
            let obj = {
                color: theme.color,
                sidebar: 'right'
            }
            setThemeStoarge(obj);
            setTheme(obj); console.log(obj)
        }

    }
    const handleLogout = () => {
        alert("LOGGING OUT")
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row layout-container row  justify-content-center">
                    {theme.sidebar === 'left' && (<>
                        <div className={`sidebar col-md-2 py-md-5 ${theme.color}`}>
                            <Sidebar handleTheme={toggleTheme} handleLogout={handleLogout} toggleSidebar={toggleSidebar} />

                        </div>
                        <div className="col-md-10">{children}</div>
                    </>)}

                    {theme.sidebar === 'right' && (
                        <>
                            <div className="col-md-10 mt-5 pl-4 order-2 order-md-0"
                                style={{
                                    paddingLeft: "2rem"
                                }}
                            >{children}</div>

                            <div className={`sidebar col-md-2 py-md-5 ${theme.color}`}>
                                <Sidebar handleTheme={toggleTheme} handleLogout={handleLogout} toggleSidebar={toggleSidebar} />
                            </div>

                        </>
                    )}
                </div>
            </div>
        </>
    );
}

