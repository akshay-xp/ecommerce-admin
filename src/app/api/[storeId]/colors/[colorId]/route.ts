import { NextResponse } from "next/server"

import db from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 })
    }

    const color = await db.color.findUnique({
      where: {
        id: params.colorId,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 })
    }

    const color = await db.color.delete({
      where: {
        id: params.colorId,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string } }
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

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 })
    }

    const color = await db.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}
