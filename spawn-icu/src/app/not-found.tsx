import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 pt-20 text-center">
      <div className="flex flex-col items-center">
        <Logo kind="icon" className="h-16 w-auto" />
        <h1 className="display-h mt-6 text-3xl font-semibold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          The page you are looking for does not exist or has moved.
        </p>
        <Link href="/" className="btn btn-primary mt-7">
          Back home
        </Link>
      </div>
    </section>
  );
}
