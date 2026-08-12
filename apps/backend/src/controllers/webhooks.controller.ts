import type { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../services/prisma";
import { stripe } from "../services/stripe.service";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function handleStripeWebhook(req: Request, res: Response) {
  const signature = req.headers["stripe-signature"];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature as string, WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).json({ error: `Webhook signature verification failed: ${(error as Error).message}` });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    await prisma.enrollment.updateMany({
      where: { stripeCheckoutSessionId: session.id },
      data: {
        status: "COMPLETED",
        purchasedAt: new Date(),
        stripePaymentIntentId:
          typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
      },
    });
  }

  return res.json({ received: true });
}
