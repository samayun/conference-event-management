import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useOrder } from "../context/OrderProvider";

const PaymentForm = ({ handlePayment, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const {
        orderSuccess,
        setOrderSuccess,
        orderError,
        setOrderError,
    } = useOrder();

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
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.log("[error]", error);
            setOrderError(error.message);
            setOrderSuccess(null);
        } else {
            const paymentdata = {
                id: paymentMethod.id,
                card: paymentMethod.card.brand,
                type: paymentMethod.type,
            };
            handlePayment(paymentdata);
            setOrderSuccess(`Your payment was success successful`);
            setOrderError(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-100 px-5">
            <h4 className={`text-center text-${orderError ? "danger" : "success"}`}>
                {orderError ? orderError : orderSuccess}
            </h4>

            <CardElement />
            <i className="text-muted">4242424242424242</i>
            <button
                type="submit"
                disabled={!stripe}
                className="btn btn-info  d-flex align-items-center mt-3"
            >
                {amount && `৳ ${amount} /- `}
                <strong className="mx-2 text-white">Pay Via</strong>
                <i
                    className="fab fa-stripe text-primary mx-3"
                    style={{
                        fontSize: "3rem",
                    }}
                ></i>
            </button>
        </form>
    );
};
export default PaymentForm;
