import { redirect } from "next/navigation"

import db from "@/lib/db"

import { SettingsForm } from "./components/settings-form"

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const store = await db.store.findUnique({
    where: {
      id: params.storeId,
    },
  })

  if (!store) {
    redirect("/")
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingsPage
