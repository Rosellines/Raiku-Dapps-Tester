export type RaikuMode = "JIT" | "AOT";

export interface RaikuIntent {
  mode: RaikuMode;
  maxSlotDelay?: number;
  priorityFee?: number;
  targetSlot?: number;
}
