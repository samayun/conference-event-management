import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
// import MyCheckoutForm from '../components/MyCheckoutForm.component';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51Ihe7gSC7LBdi15aySAEN7dK6XYxTp8a32EkzU0qSXIRTqGaNwq9SZkwNJXPuobkwD56JepkQcv9imotbQj5hxI100p4wkVUhV'
);

const ProcessPayment = ({ handlePayment, amount }) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm handlePayment={handlePayment} amount={amount} />
        </Elements>
    );
}

export default ProcessPayment;