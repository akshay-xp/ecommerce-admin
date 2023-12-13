import { NextResponse } from "next/server"

import db from "@/lib/db"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json()

    const { name, value } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 })
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const color = await db.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLORS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const colors = await db.color.findMany({
      where: {
        storeId: params.storeId,
      },
    })

    return NextResponse.json(colors)
  } catch (error) {
    console.log("[COLORS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
