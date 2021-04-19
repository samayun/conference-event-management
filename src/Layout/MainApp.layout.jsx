import { Suspense, lazy } from 'react';
import './MainApp.layout.css';

const Navbar = lazy(() => import('./Navbar'))
const Footer = lazy(() => import('./Footer'))

export default function MainAppLayout({ children, header }) {
    return (
        <>
            <div className="w-100">
                <header className={header ? 'banner-section' : 'bg-hero'}>
                    <Suspense fallback={<h3>Loading Navbar... </h3>}>
                        <Navbar />
                    </Suspense>
                    {header}
                </header>
                <div className="">
                    {children}
                </div>
                <Suspense fallback={<h3>Loading Footer... </h3>}>
                    <Footer />
                </Suspense>
            </div>

        </>
    )
}