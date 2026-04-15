import Link from "next/link";
import Card from "@/components/Card";
import Button from "@/components/Button";

async function getCustomers() {
    const res = await fetch("http://127.0.0.1:8000/customers", {
        cache: "no-store"
    });
    if (!res.ok) {
        throw new Error("顧客データの取得に失敗しました")
}
    return res.json();
}

export default async function customers() {
    const customers = await getCustomers()

    return (
        <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">顧客一覧</h1>

      <div className="mb-6">
        <Link href="/customers/new">
          <Button>＋ 顧客追加</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {customers.map((customer: { id: number; name: string; status: string }) => (
          <Link
            key={customer.id}
            href={`/customers/${customer.id}`}
            className="block"
          >
            <Card>
              <h3 className="font-semibold text-lg mb-3">{customer.name}</h3>
              <span className="rounded-full bg-blue-100 text-blue-600 px-3 py-1 text-xs font-medium">
                {customer.status}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}