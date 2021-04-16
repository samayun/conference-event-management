import Navbar from './Navbar'
import Footer from './Footer'
import './MainApp.layout.css';

export default function MainAppLayout({ children, header }) {
    return (
        <>
            <div className="w-100">
                <header className={header ? 'banner-section' : 'bg-hero'}>
                    <Navbar />
                    {header}
                </header>

                {children}
                <Footer />
            </div>

        </>
    )
}