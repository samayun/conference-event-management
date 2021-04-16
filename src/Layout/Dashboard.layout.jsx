import Sidebar from "./Sidebar";

export default function MainApp({ children }) {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10">{children}</div>
                </div>
            </div>
        </>
    );
}
