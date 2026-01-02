// Type for values that can be template references (e.g., ${stages.memory})
// Used across all domain types for fields that may contain template variable references
export type Resolvable<T> = T | string;
