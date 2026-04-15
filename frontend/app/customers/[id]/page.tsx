import Button from "@/components/Button";
import Link from "next/link";

type Customer = {
  id: number;
  name: string;
  status: string;
};

type Deal = {
  id: number;
  title: string;
  amount: number;
  status: string;
  customer_id: number;
};

async function getCustomer(id: string): Promise<Customer> {
  const res = await fetch(`http://127.0.0.1:8000/customers/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("顧客情報の取得に失敗しました");
  }

  return res.json();
}

async function getCustomerDeals(id: string): Promise<Deal[]> {
  const res = await fetch(`http://127.0.0.1:8000/customers/${id}/deals`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("商談情報の取得に失敗しました");
  }

  return res.json();
}

function getStatusStyle(status: string) {
  switch (status.toLowerCase()) {
    case "lead":
      return "bg-blue-100 text-blue-700";
    case "negotiation":
      return "bg-yellow-100 text-yellow-700";
    case "won":
      return "bg-green-100 text-green-700";
    case "lost":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const customer = await getCustomer(id);
  const deals = await getCustomerDeals(id);

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-2">顧客詳細</p>
          <h1 className="text-3xl font-bold">{customer.name}</h1>
        </div>

        <Link href={`/customers/${customer.id}/new-deal`}>
          <Button>商談を追加</Button>
        </Link>
      </div>

      <section className="rounded-2xl border bg-white p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">顧客情報</h2>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
              customer.status
            )}`}
          >
            {customer.status}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500 mb-1">顧客ID</p>
            <p className="font-semibold">{customer.id}</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500 mb-1">名前</p>
            <p className="font-semibold">{customer.name}</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500 mb-1">ステータス</p>
            <p className="font-semibold">{customer.status}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">商談一覧</h2>
          <p className="text-sm text-gray-500">{deals.length}件</p>
        </div>

        {deals.length === 0 ? (
          <div className="rounded-xl border border-dashed p-6 text-center text-gray-500">
            商談はまだ登録されていません
          </div>
        ) : (
          <div className="space-y-4">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="rounded-xl border p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-lg font-semibold">{deal.title}</p>
                    <p className="text-sm text-gray-500">商談ID: {deal.id}</p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                      deal.status
                    )}`}
                  >
                    {deal.status}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500 mb-1">金額</p>
                    <p className="font-semibold">¥{deal.amount.toLocaleString()}</p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500 mb-1">顧客ID</p>
                    <p className="font-semibold">{deal.customer_id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}