// ============================================================
// Branded Types — prevent primitive obsession
// These types can ONLY be created via their factory functions
// ============================================================

export type ProductId = string & { readonly __brand: unique symbol }
export type ProductName = string & { readonly __brand: unique symbol }
export type PriceNumber = number & { readonly __brand: unique symbol }
export type StockLevel = number & { readonly __brand: unique symbol }
export type Quantity = number & { readonly __brand: unique symbol }
