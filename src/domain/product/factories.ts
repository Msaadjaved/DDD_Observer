import { v4 as uuidv4 } from "uuid"
import type { ProductId, ProductName, PriceNumber, StockLevel, Quantity } from "./types"
import type { Product } from "./product"

// ============================================================
// Smart Constructors — validate BEFORE branding
// The "as BrandType" cast is ONLY allowed here, after checks
// ============================================================

const VALID_PRODUCT_NAMES = ["Shoes", "Shirt", "Pants", "Jacket", "Hat"] as const

export function createProductName(value: string): ProductName {
  if (!value || value.trim() === "") {
    throw new Error("Product name cannot be empty")
  }
  if (!VALID_PRODUCT_NAMES.includes(value as typeof VALID_PRODUCT_NAMES[number])) {
    throw new Error(`Product name must be one of: ${VALID_PRODUCT_NAMES.join(", ")}`)
  }
  return value as ProductName
}

export function createPrice(value: number): PriceNumber {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Price must be a valid number")
  }
  if (value <= 0) {
    throw new Error("Price must be greater than zero")
  }
  return value as PriceNumber
}

export function createStockLevel(value: number): StockLevel {
  if (!Number.isInteger(value)) {
    throw new Error("Stock level must be a whole number")
  }
  if (value < 0) {
    throw new Error("Stock level cannot be negative")
  }
  return value as StockLevel
}

export function createQuantity(value: number): Quantity {
  if (!Number.isInteger(value)) {
    throw new Error("Quantity must be a whole number")
  }
  if (value <= 0) {
    throw new Error("Quantity must be greater than zero")
  }
  return value as Quantity
}

// ============================================================
// Product Factory — composes all smart constructors
// ============================================================

export function createProduct(
  name: ProductName,
  price: PriceNumber,
  stock: StockLevel
): Product {
  return {
    id: uuidv4() as ProductId,
    name,
    price,
    stock,
  }
}

// ============================================================
// Domain Operation — reduce stock after a purchase
// Enforces the rule: stock can never go below zero
// ============================================================

export function reduceStock(product: Product, quantity: Quantity): Product {
  if (quantity > product.stock) {
    throw new Error(
      `Cannot reduce stock by ${quantity}. Only ${product.stock} units available for "${product.name}"`
    )
  }
  return {
    ...product,
    stock: createStockLevel(product.stock - quantity),
  }
}
