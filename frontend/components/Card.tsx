export default function Card({ children }: { children: React.ReactNode }) {
    return (
      <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
        {children}
      </div>
    );
  }