import React from "react"

export const metadata = {
  title: "Info - L3ba",
  description: "Additional information about the L3ba app",
}

export default function InfoPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">About L3ba</h1>
      <p className="mb-4">L3ba is a simple multiplayer word game focused on categories and social play.</p>
      <section>
        <h2 className="text-lg font-semibold">App ID</h2>
        <p className="text-sm text-muted-foreground">This app's stable identifier: <code>https://l3ba.vercel.app/</code></p>
      </section>
    </main>
  )
}
