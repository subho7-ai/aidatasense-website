import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const FRONTEND_URL = process.env.FRONTEND_URL as string;

export function createCheckoutSession(params: {
  stripePriceId: string;
  userId: string;
  courseId: string;
}) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: params.stripePriceId, quantity: 1 }],
    success_url: `${FRONTEND_URL}/account?checkout=success`,
    cancel_url: `${FRONTEND_URL}/courses?checkout=cancelled`,
    metadata: { userId: params.userId, courseId: params.courseId },
  });
}
