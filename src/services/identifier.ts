/**
 * Shared Identifier Service
 * Generates safe, unique, and deterministic identifiers for demo-state creation
 * Structure: <prefix>-<YYYYMMDD>-<increment>
 */

const increments: Record<string, number> = {};

export function generateDeterministicId(prefix: string): string {
  const cleanPrefix = prefix.toUpperCase().trim();
  const dateSegment = new Date().toISOString().split('T')[0]?.replace(/-/g, '') || '20260716';
  
  // Track increments dynamically inside the session to guarantee uniqueness
  const currentCount = (increments[cleanPrefix] || 0) + 1;
  increments[cleanPrefix] = currentCount;
  
  const paddedCount = String(currentCount).padStart(3, '0');
  return `${cleanPrefix}-${dateSegment}-${paddedCount}`;
}
