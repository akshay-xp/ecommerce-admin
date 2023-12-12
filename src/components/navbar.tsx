import { UserButton } from "@clerk/nextjs"

import StoreSwitcher from "@/components/store-switcher"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import db from "@/lib/db"

const Navbar = async () => {
  const stores = await db.store.findMany()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
