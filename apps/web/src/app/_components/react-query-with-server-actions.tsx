"use client"

import { useDebounceValue } from "usehooks-ts"
import { sayHelloWorld } from "@/server/queries"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"

export default function RQWithServerActions() {
  const [input, setInput] = useDebounceValue("", 0)

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ["sayHelloWorld"],
    queryFn: () => sayHelloWorld({ input: { message: input } }),
  })

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <input
        className="rounded-md border-2 border-black p-2 text-white"
        placeholder="Message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <span className="text-black">
        {isLoading || isRefetching ? "loading..." : data?.result}
      </span>
      <Button disabled={isLoading} onClick={() => refetch()}>
        Send
      </Button>
    </div>
  )
}
