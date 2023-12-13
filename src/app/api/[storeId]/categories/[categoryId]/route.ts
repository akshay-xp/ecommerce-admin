import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import db from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 })
    }

    const category = await db.category.delete({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth()

    const body = await req.json()

    const { name } = body

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 })
    }

    const category = await db.category.update({
      where: {
        id: params.categoryId,
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
