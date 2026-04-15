"use client";

import { useState } from "react";
import{ useRouter } from "next/navigation"

import Button from "@/components/Button";
import Input from "@/components/Input";



export default function NewCustomerPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
        setError("")
    try {
        const res = await fetch("http://127.0.0.1:8000/customers", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                status
            })
        })
        if (!res.ok) {
            throw new Error("顧客登録に失敗しました")
        }

        router.push("/customers");
        router.refresh();
    } catch(err) {
        setError("登録できませんでした");
        console.error(err)
    }finally {
        setLoading(false)
    }
}
return (
    <main className="p-6 max-w-xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">顧客登録</h1>

    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
    <label className="text-sm">名前</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
    </div>

      <div>
        <label className="text-sm">ステータス</label>
            <Input value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit">{loading ? "登録中..." : "登録する"}</Button>
    </form>
  </main>
)
}