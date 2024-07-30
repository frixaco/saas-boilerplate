import RQWithServerActions from "./_components/react-query-with-server-actions"
import Link from "next/link"

export default async function Home() {
  return (
    <main>
      <RQWithServerActions />
      <Link className="underline" href="/sentry-example-page">
        Go to Sentry Test Page
      </Link>
    </main>
  )
}
