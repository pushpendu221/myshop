import { useSyncExternalStore } from "react";

const subscribe = () => () => {}; // nothing to listen to

export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true, // in the browser: "yes, I'm the client"
    () => false, // on the server: "no"
  );
}
