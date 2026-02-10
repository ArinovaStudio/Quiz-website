import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";
import z from "zod";

const profileSchema = z.object({
  name: z.string().min(2).max(20),
});

export async function PUT(req: NextRequest) {
  try {
    const userId = await checkUser();
    if (!userId){
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const validation = profileSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation Error", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name: validation.data.name },
      select: { id: true, name: true, email: true, image: true }
    });

    return NextResponse.json({ success: true, user: updatedUser });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}