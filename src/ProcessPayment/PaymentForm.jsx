import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router';
import { useOrder } from '../context/OrderProvider';

const PaymentForm = ({ handlePayment, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { createOrder, orderSuccess, setOrderSuccess, orderError, setOrderError } = useOrder();
    const history = useHistory();
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();


        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
            setOrderError(error.message);
            setOrderSuccess(null);
        } else {
            const paymentdata = {
                id: paymentMethod.id,
                card: paymentMethod.card.brand,
                type: paymentMethod.type
            }
            handlePayment(paymentdata);
            setOrderSuccess(`Your payment was success successful`);
            setOrderError(null);
        }
    };



    return (
        <form onSubmit={handleSubmit} className="w-100 px-5">
            <h4 className={`text-center text-${orderError ? 'danger' : 'success'}`}>
                {orderError ? orderError : orderSuccess}</h4>

            <CardElement value={'4242 4242 4242 4242'} />
            <button type="submit" disabled={!stripe} className="btn btn-primary">
                {amount && `$ ${amount}  `}
                Pay Via Stripe </button>
        </form>
    );
};
export default PaymentForm;