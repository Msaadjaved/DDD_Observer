import type { DomainEvent } from "../../domain/events/events"

// ============================================================
// Database Mock Observer
// Simulates persisting domain events for audit / analytics
// ============================================================

export function saveToDatabaseMock(event: DomainEvent): void {
  const record = {
    eventType: event.type,
    timestamp: new Date().toISOString(),
    payload: event,
  }
  console.log(`[Database] 💾 Event persisted: ${JSON.stringify(record, null, 2)}`)
}
