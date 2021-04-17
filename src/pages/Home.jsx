import { lazy, Suspense } from 'react';

import HeaderMain from '../components/Banner.component'
import Services from '../components/Services.component'
import MainAppLayout from '../Layout/MainApp.layout'
import Contact from '../components/Home/Contact.component'
import ErrorProvider from '../context/useError';
const Testimonials = lazy(() => import('../components/Testimonials.component'))

export default function Home() {
    return (
        <MainAppLayout
            header={<HeaderMain />}
        >
            <ErrorProvider>
                <Services />
            </ErrorProvider>

            <ErrorProvider>
                <Testimonials />
            </ErrorProvider>
            <ErrorProvider>
                <Contact />
            </ErrorProvider>
        </MainAppLayout>
    )
}
