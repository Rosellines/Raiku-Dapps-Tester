export function log(...args: any[]) {
  console.log("[Raiku]", ...args);
}

export function error(...args: any[]) {
  console.error("[Raiku ERROR]", ...args);
}

// 👇 ini memaksa TypeScript menganggap file ini module
export {};
