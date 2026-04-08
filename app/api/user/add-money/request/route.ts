import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";
import Razorpay from "razorpay";
import { v4 } from "uuid";
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
const MINIMUM_BALANCE = 100;

export async function POST(req: NextRequest) {
  try {
    const userId = await checkUser();
    const { amount } = await req.json();
    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      );
    }
    if (numericAmount < MINIMUM_BALANCE)
      return NextResponse.json(
        {
          success: false,
          message: `Amount Should Be At Least ${MINIMUM_BALANCE}!`,
        },
        { status: 404 }
      );

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 400 }
      );
    }

    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) {
      return NextResponse.json(
        { success: false, message: "Wallet not found" },
        { status: 404 }
      );
    }
    const receiptId = v4().slice(0, 15);
    const shortReceipt = `rcpt_${receiptId}_${Date.now()}`;

    const orderOptions = {
      amount: numericAmount * 100,
      currency: "INR",
      receipt: shortReceipt,
    };

    const order = await razorpay.orders.create(orderOptions);
    const transaction = await prisma.transactionHistory.create({
      data: {
        walletId: wallet.id,
        paymentId: order.id,
        amount: numericAmount,
        tokens: numericAmount,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      order,
      transactionId: transaction.id,
    });
    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
