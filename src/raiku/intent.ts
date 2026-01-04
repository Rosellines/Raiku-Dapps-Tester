import { RaikuIntent } from "./types";

/**
 * Attach Raiku execution intent as metadata.
 * This is read by Raiku-aware validators / sidecars.
 */
export function attachRaikuIntent(
  tx: any,
  intent: RaikuIntent
) {
  tx.__raiku_intent = intent;
  return tx;
}
