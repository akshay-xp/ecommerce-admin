import { NextResponse } from "next/server"

import db from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const store = await db.store.create({
      data: {
        name,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}
