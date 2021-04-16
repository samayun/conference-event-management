import { Suspense } from 'react'
import HeaderMain from '../components/Banner.component'
import Services from '../components/Services.component'
import MainAppLayout from '../Layout/MainApp.layout'
import Testimonials from '../components/Testimonials.component'
import Contact from '../components/Home/Contact.component'
export default function Home() {
    return (
        <MainAppLayout
            header={<HeaderMain />}
        >
            <Suspense fallback={<h2> .Loader </h2>}>
                <Services />
            </Suspense>

            {/* <Suspense fallback={<h2> .Loader </h2>}> */}
            <Testimonials />
            {/* </Suspense> */}
            <Contact />

        </MainAppLayout>
    )
}
