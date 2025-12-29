"use client"

import { useAuthStore } from "@/store/useAuthStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user)

    if (!user) return null

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Username</Label>
                        <Input value={user.username} readOnly />
                    </div>
                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input value={user.email} readOnly />
                    </div>
                    <div className="grid gap-2">
                        <Label>Role</Label>
                        <Input value={user.role} readOnly />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
