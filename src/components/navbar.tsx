import { UserButton, auth } from "@clerk/nextjs"

import StoreSwitcher from "@/components/store-switcher"
import { MainNav } from "@/components/main-nav"
import db from "@/lib/db"
import { redirect } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const Navbar = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  })

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
