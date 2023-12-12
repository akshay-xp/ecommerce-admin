import { redirect } from "next/navigation"

import Navbar from "@/components/navbar"
import db from "@/lib/db"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const store = await db.store.findFirst()

  if (!store) {
    redirect("/setup")
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
