import Stripe from 'stripe';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
dotenv.config();

const stripe = new Stripe(process.env.stripe_sk);

const checkOut = asyncHandler(async (req, res) => {
    const { cartItems } = req.body; // Receive cart items from the request

    const lineItems = cartItems.map((item) => ({
        price_data: {
            currency: 'EUR',
            product_data: {
                name: item.name,
                images: [item.image],
                condition: item.condition,
            },
            unit_amount: item.price * 100, // Stripe requires the amount in cents
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.based_url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.based_url}/cancel`,
    });

    res.json({ sessionUrl: session.url });
});

export default checkOut;
