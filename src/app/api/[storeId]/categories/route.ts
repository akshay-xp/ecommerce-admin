import { NextResponse } from "next/server"

import db from "@/lib/db"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json()

    const { name } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const category = await db.category.create({
      data: {
        name,
        storeId: params.storeId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // const body = await req.json();

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const categories = await db.category.findMany({
      where: {
        storeId: params.storeId,
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { name, id } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!id) {
      return new NextResponse("Id is required", { status: 400 })
    }

    const category = await db.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}
