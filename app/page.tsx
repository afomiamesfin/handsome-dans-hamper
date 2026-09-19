import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-md mx-auto min-h-screen flex flex-col gap-4 p-6 pt-10">
      <Link
        href="/pauli-murray/washer/7"
        className="bg-ink text-white rounded-2xl px-5 py-4 font-bold text-center"
      >
        WASHER
      </Link>
      <Link
        href="/pauli-murray/dryer/7"
        className="bg-ink text-white rounded-2xl px-5 py-4 font-bold text-center"
      >
        DRYER
      </Link>
      <Link
        href="/find-my-laundry"
        className="border-[1.5px] border-bordergray rounded-2xl px-5 py-4 font-bold text-center"
      >
        FIND MY LAUNDRY
      </Link>
    </main>
  );
}