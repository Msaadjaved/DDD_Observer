import type { ProductId, ProductName, PriceNumber, StockLevel, Quantity } from "../product/types"

// ============================================================
// Domain Events — discriminated union for type-safe observers
// All fields are readonly: observers must never mutate events
// ============================================================

export type ProductCreatedEvent = {
  readonly type: "ProductCreated"
  readonly productId: ProductId
  readonly name: ProductName
  readonly price: PriceNumber
  readonly stock: StockLevel
}

export type PriceUpdatedEvent = {
  readonly type: "PriceUpdated"
  readonly productId: ProductId
  readonly oldPrice: PriceNumber
  readonly newPrice: PriceNumber
}

export type StockReducedEvent = {
  readonly type: "StockReduced"
  readonly productId: ProductId
  readonly quantityRemoved: Quantity
  readonly newLevel: StockLevel
}

// Union type — the Observer contract accepts any of these
export type DomainEvent = ProductCreatedEvent | PriceUpdatedEvent | StockReducedEvent
