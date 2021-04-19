import { Suspense, lazy } from 'react';

import HeaderMain from '../components/Banner.component';
import Services from '../components/Services.component';
import MainAppLayout from '../Layout/MainApp.layout';
import ErrorProvider from '../context/useError';
import SpeakerComponent from '../components/Speaker.component';
const Testimonials = lazy(() => import('../components/Testimonials.component'));
const Contact = lazy(() => import('../components/Home/Contact.component'));

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
                <Suspense fallback={<h3>Loading.... Contct</h3>}>
                    <Contact />
                </Suspense>
            </ErrorProvider>
        </MainAppLayout>
    )
}
