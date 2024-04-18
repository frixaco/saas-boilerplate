import { NodeRuntime } from "@effect/platform-node";
import * as Http from "@effect/platform/HttpClient";
import { Console, Effect } from "effect";

// DOCS: https://www.npmjs.com/package/@effect/platform
const getPostAsJson = Http.request
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .pipe(Http.client.fetch, Http.response.json);

NodeRuntime.runMain(
  getPostAsJson.pipe(Effect.andThen((post) => Console.log(typeof post, post))),
);
