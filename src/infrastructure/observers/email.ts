import type { DomainEvent } from "../../domain/events/events"

// ============================================================
// Email Mock Observer
// Simulates sending email notifications on domain events
// ============================================================

export function sendEmailMock(event: DomainEvent): void {
  if (event.type === "ProductCreated") {
    console.log(
      `[Email] 📧 New product listed: "${event.name}" at €${event.price} — notified warehouse team.`
    )
  }

  if (event.type === "PriceUpdated") {
    console.log(
      `[Email] 📧 Price changed for product ${event.productId}: €${event.oldPrice} → €${event.newPrice} — notified subscribers.`
    )
  }

  if (event.type === "StockReduced") {
    if (event.newLevel <= 5) {
      console.log(
        `[Email] ⚠️  Low stock alert! Product ${event.productId} has only ${event.newLevel} units left — notified purchasing team.`
      )
    } else {
      console.log(
        `[Email] 📧 Stock reduced by ${event.quantityRemoved} for product ${event.productId}. Remaining: ${event.newLevel}.`
      )
    }
  }
}
