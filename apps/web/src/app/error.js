"use client";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import React from "react";

export default function Error({ error, reset }) {

  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  if (error?.message.includes('401')) {
    return <div>You are not authorized to see this</div>;
  }

  if (error?.message.includes('503')) {
    return <div>Looks like our API is down</div>;
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-6">

      <div className="max-w-xl w-full bg-card rounded-lg shadow p-6">

        <h1 className="text-2xl font-semibold text-destructive">An error occurred</h1>

        <p className="mt-2 text-sm text-muted-foreground">{error?.message ?? "Unexpected error"}</p>

        <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>

          <button onClick={() => reset?.()} className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
            Try again
          </button>
        </div>

      </div>

    </div>
  );
}
