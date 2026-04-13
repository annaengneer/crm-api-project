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
            <div className="space-y-3">
                {customers.map((customer: {id:number; name:string; status: string})=>(
                        <div key={customer.id} className="border rounded-lg p-4">
                            <p>ID: {customer.id}</p>
                            <p>名前:{customer.name}</p>
                            <p>ステータス:{customer.status}</p>
                        </div>
                    ))}
            </div>
        </main>
    );
}
