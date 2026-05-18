import crypto from "node:crypto";
import Razorpay from "razorpay";

export const razorpayConfig = {
  keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  keySecret: process.env.RAZORPAY_KEY_SECRET || "",
  webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || "",
  currency: (process.env.NEXT_PUBLIC_STORE_CURRENCY || "INR").toUpperCase(),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const starterCheckoutProduct = {
  name: "ApexStride Starter Checkout",
  description: "Initial Razorpay checkout used to validate payment orchestration.",
  amount: 189900,
};

let razorpayClient;

function signaturesMatch(expectedSignature, providedSignature) {
  const expectedBuffer = Buffer.from(expectedSignature);
  const providedBuffer = Buffer.from(providedSignature);

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}

export function getRazorpayServerClient() {
  if (!razorpayConfig.keyId || !razorpayConfig.keySecret) {
    return null;
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: razorpayConfig.keyId,
      key_secret: razorpayConfig.keySecret,
    });
  }

  return razorpayClient;
}

export function getRazorpayEnvironmentStatus() {
  return {
    hasKeyId: Boolean(razorpayConfig.keyId),
    hasKeySecret: Boolean(razorpayConfig.keySecret),
    hasWebhookSecret: Boolean(razorpayConfig.webhookSecret),
    currency: razorpayConfig.currency,
    siteUrl: razorpayConfig.siteUrl,
  };
}

export function verifyRazorpaySignature({ orderId, paymentId, signature }) {
  if (!razorpayConfig.keySecret || !orderId || !paymentId || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", razorpayConfig.keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return signaturesMatch(expectedSignature, signature);
}

export function verifyRazorpayWebhookSignature(payload, signature) {
  if (!razorpayConfig.webhookSecret || !payload || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", razorpayConfig.webhookSecret)
    .update(payload)
    .digest("hex");

  return signaturesMatch(expectedSignature, signature);
}
