"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { useAuthStore } from "@/store/useAuthStore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Topbar() {
    const user = useAuthStore((state) => state.user)

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-4">
                {/* Mobile menu trigger could go here */}
                <h1 className="text-lg font-semibold md:hidden">MyApp</h1>
            </div>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium hidden md:block">
                        {user?.username || "User"}
                    </div>
                    {/* Avatar requires Shadcn Avatar component, I will mock it or create it */}
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                </div>
            </div>
        </header>
    )
}
