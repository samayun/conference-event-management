import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="text-center bg-primary align-items-center py-5 d-flex justify-content-center" style={{ height: '100px' }}>
            <Link className="text-danger"> Copywright Conference Team &copy; {new Date().getFullYear()} </Link>
        </footer>
    );
}
