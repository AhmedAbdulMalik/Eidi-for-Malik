export async function onRequest(context) {
  const url = new URL(context.request.url);
  const amount = url.searchParams.get("amount");

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return new Response("Invalid amount", { status: 400 });
  }

  const upi = context.env.UPI_ID;
  const name = context.env.NAME;

  const upiLink = `upi://pay?pa=${upi}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

  return Response.redirect(upiLink, 302);
}