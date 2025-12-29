"use client"

import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isAuthenticated, token } = useAuthStore()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && !isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, mounted, router])

    if (!mounted) return null // or a loading spinner

    if (!isAuthenticated) return null

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <div className="hidden md:block">
                <Sidebar />
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
