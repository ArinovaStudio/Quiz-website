import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";
import crypto from "crypto";


export async function POST(req: NextRequest) {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 404 }
      );
    }
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      transactionId,
    } = await req.json();

    const wallet = await prisma.wallet.findUnique({
      where: { userId: userId },
    });

    if (!wallet)
      return NextResponse.json(
        { success: false, message: "Wallet not found" },
        { status: 404 }
      );
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throw Error("Payment Failed" );
    }
    const transaction = await prisma.transactionHistory.findUnique({
      where:{
        paymentId: razorpay_order_id,
        id: transactionId  
      }
    });
    if(!transaction) throw Error("Transaction Not Found!");
    if(transaction.type==="CREDIT"){
      await prisma.wallet.update({
        where:{
          userId: userId
        },
        data:{
          balance:{
            increment: transaction.tokens
          }
        }
      })
    }
    return NextResponse.json(
      { success: true, message: "Tokens Added Successfully!" },
      { status: 200 }
    );
  } catch(error: any) {
    return NextResponse.json(
      { success: false, message: error.message.slice(0,20) || "Internal Server Error" },
      { status: 500 }
    );
  }
}
