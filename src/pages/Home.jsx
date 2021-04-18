import { lazy } from 'react';

import HeaderMain from '../components/Banner.component'
import Services from '../components/Services.component'
import MainAppLayout from '../Layout/MainApp.layout'
import Contact from '../components/Home/Contact.component'
import ErrorProvider from '../context/useError';
import SpeakerComponent from '../components/Speaker.component';
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
                <SpeakerComponent />
            </ErrorProvider>
            <ErrorProvider>
                <Contact />
            </ErrorProvider>
        </MainAppLayout>
    )
}
