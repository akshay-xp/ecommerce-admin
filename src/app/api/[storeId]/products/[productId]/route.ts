import { NextResponse } from "next/server"

import db from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 })
    }

    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 })
    }

    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          deleteMany: {},
        },
      },
    })

    const product = await db.product.delete({
      where: {
        id: params.productId,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json()

    const { name, price, categoryId, images, colorId, sizeId } = body

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 })
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 })
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 })
    }

    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
      },
    })

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}
