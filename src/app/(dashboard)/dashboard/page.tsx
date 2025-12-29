"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuthStore } from "@/store/useAuthStore"

interface Post {
    id: number
    title: string
    content: string
    published: boolean
    author: {
        username: string
    }
    createdAt: string
}

const postSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
})

type PostFormValues = z.infer<typeof postSchema>

export default function DashboardPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const user = useAuthStore((state) => state.user)

    const { register, handleSubmit, reset } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
    })

    const fetchPosts = async () => {
        try {
            const res = await api.get("/posts")
            setPosts(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const onSubmit = async (data: PostFormValues) => {
        try {
            await api.post("/posts", data)
            reset()
            fetchPosts()
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return
        try {
            await api.delete(`/posts/${id}`)
            fetchPosts()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Post</CardTitle>
                        <CardDescription>Share your thoughts with the world</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" {...register("title")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <Input id="content" {...register("content")} />
                            </div>
                            <Button type="submit">Publish Post</Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Recent Posts</h3>
                    {loading ? (
                        <div>Loading posts...</div>
                    ) : posts.length === 0 ? (
                        <div className="text-muted-foreground">No posts found.</div>
                    ) : (
                        posts.map((post) => (
                            <Card key={post.id}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{post.title}</CardTitle>
                                    <CardDescription>
                                        By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{post.content}</p>
                                </CardContent>
                                {/* Only show delete if user is author. Assuming simple check for now */}
                                {/* In real app, check user.id vs post.author.id */}
                                <div className="px-6 pb-4">
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
