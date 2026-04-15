"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewDealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [customerId, setCustomerId] = useState<string>("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then((p) => {
      setCustomerId(p.id);
    });
  }, [params]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/deals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          status,
          customer_id: Number(customerId),
        }),
      });

      if (!res.ok) {
        throw new Error("商談登録に失敗しました");
      }

      router.push(`/customers/${customerId}`);
      router.refresh();
    } catch (err) {
      setError("登録できませんでした");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">商談登録</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">商談名</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="LP制作"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">金額</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="300000"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">ステータス</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="lead"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="border rounded-lg px-4 py-2"
        >
          {loading ? "登録中..." : "登録する"}
        </button>
      </form>
    </main>
  );
}