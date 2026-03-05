import type { DomainEvent } from "../../domain/events/events"

// ============================================================
// Observer Type — all listeners share this exact contract
// Signature mismatch = TypeScript error (no silent bugs)
// ============================================================

export type Observer = (event: DomainEvent) => void

// ============================================================
// Observer Registry — the "emitter" array
// Push any function that matches the Observer type
// ============================================================

export const observers: Observer[] = []

export function registerObserver(observer: Observer): void {
  observers.push(observer)
  console.log(`[Observer] Registered: ${observer.name || "anonymous"}`)
}

export function emit(event: DomainEvent): void {
  console.log(`\n[Emitter:${event.type}] Emitting event...`)
  observers.forEach((observer) => observer(event))
}
