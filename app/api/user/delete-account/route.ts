import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signOut } from "next-auth/react";
import { emailTemplates } from "@/lib/emailTemplates";
import sendEmail from "@/lib/email";
import { compare } from "bcryptjs";
const verificationSchema = z.object({
  email: z.string().min(1),
  password: z.string().optional(),
  otp: z.string().optional(),
  step: z.enum(["credentials", "otp", "delete"], "Step Is Invalid"),
});
const EMAIL = process.env.EMAIL_USER!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = verificationSchema.safeParse(body);
    if (!validation.success)
      throw Error(z.treeifyError(validation.error).errors[0]);
    const { email, password, step, otp } = validation.data;
    if (step === "credentials") {
      const exist = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!exist) throw Error("Invalid Credentials");
      const isUser = await compare(password!, exist.password!);
      if (!isUser) throw Error("Invalid Credentials");
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expireTime = new Date(Date.now() + 15 * 60 * 1000);
      const otpExists = await prisma.otp.findUnique({
        where: {
          email: email,
        },
      });
      if (otpExists) {
        await prisma.otp.delete({
          where: {
            email: email,
          },
        });
      }
      await prisma.otp.create({
        data: {
          code: code,
          email: email,
          expiresAt: expireTime,
        },
      });
      sendEmail(email, EMAIL, emailTemplates.otpVerification(code));
      return NextResponse.json({
        success: true,
        message: "Otp Sent Successfully!",
      });
    } else if (step === "otp") {
      const userOtp = otp!;
      if (userOtp.length !== 6) throw Error("Otp Not Valid");
      const exist = await prisma.otp.findUnique({
        where: { email: email, code: userOtp },
      });
      if (!exist) throw Error("Invalid Otp");
      const now = new Date();
      if (now > exist!.expiresAt) throw Error("Otp Expired!");
      await prisma.otp.delete({
        where: {
          email: email,
          code: userOtp,
        },
      });
      return NextResponse.json({
        success: true,
        message: "Otp Verified Successfully!",
      });
    } else {
      await prisma.user.delete({
        where: {
          email: email,
        },
      });
      signOut({ redirect: true, callbackUrl: "/mobile" });
      return NextResponse.json({
        success: true,
        message: "Account Deleted Successfully!",
      });
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: error.message.slice(0, 20) || "Error Occured!",
    });
  }
}
