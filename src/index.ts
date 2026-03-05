import {
  createProduct,
  createPrice,
  createProductName,
  createStockLevel,
  createQuantity,
  reduceStock,
} from "./domain/product/factories"
import { emit, registerObserver } from "./infrastructure/observers/observer"
import { sendEmailMock } from "./infrastructure/observers/email"
import { saveToDatabaseMock } from "./infrastructure/observers/database"

// ============================================================
// Register Observers
// Any function matching Observer type can be pushed here
// ============================================================

registerObserver(sendEmailMock)
registerObserver(saveToDatabaseMock)

// ============================================================
// Helper — safely run a test block without crashing the app
// ============================================================

function runTest(label: string, fn: () => void): void {
  console.log(`\n${"=".repeat(60)}`)
  console.log(`TEST: ${label}`)
  console.log("=".repeat(60))
  try {
    fn()
    console.log("✅ Passed")
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Caught error: ${error.message}`)
    } else {
      console.error("❌ Unknown error")
    }
  }
}

// ============================================================
// TEST 1 — Valid product creation
// ============================================================

runTest("Create a valid product (Shoes, €89.99, stock: 20)", () => {
  const product = createProduct(
    createProductName("Shoes"),
    createPrice(89.99),
    createStockLevel(20)
  )
  console.log("Created:", product)

  emit({
    type: "ProductCreated",
    productId: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
  })
})

// ============================================================
// TEST 2 — Reduce stock (valid)
// ============================================================

runTest("Reduce stock by 3 (valid)", () => {
  const product = createProduct(
    createProductName("Shirt"),
    createPrice(35),
    createStockLevel(10)
  )
  const quantity = createQuantity(3)
  const updated = reduceStock(product, quantity)
  console.log("Updated stock:", updated.stock)

  emit({
    type: "StockReduced",
    productId: updated.id,
    quantityRemoved: quantity,
    newLevel: updated.stock,
  })
})

// ============================================================
// TEST 3 — Low stock alert trigger
// ============================================================

runTest("Reduce stock to trigger low-stock email alert", () => {
  const product = createProduct(
    createProductName("Jacket"),
    createPrice(120),
    createStockLevel(6)
  )
  const quantity = createQuantity(4)
  const updated = reduceStock(product, quantity)
  console.log("Remaining stock:", updated.stock)

  emit({
    type: "StockReduced",
    productId: updated.id,
    quantityRemoved: quantity,
    newLevel: updated.stock,
  })
})

// ============================================================
// TEST 4 — IMPOSSIBLE DATA: negative price
// ============================================================

runTest("Impossible: negative price → should throw", () => {
  const product = createProduct(
    createProductName("Pants"),
    createPrice(-50), // ❌ invalid
    createStockLevel(10)
  )
  console.log(product)
})

// ============================================================
// TEST 5 — IMPOSSIBLE DATA: invalid product name
// ============================================================

runTest("Impossible: invalid product name → should throw", () => {
  const product = createProduct(
    createProductName("Socks"), // ❌ not in catalog
    createPrice(20),
    createStockLevel(5)
  )
  console.log(product)
})

// ============================================================
// TEST 6 — IMPOSSIBLE DATA: reduce more than available stock
// ============================================================

runTest("Impossible: reduce stock below zero → should throw", () => {
  const product = createProduct(
    createProductName("Hat"),
    createPrice(25),
    createStockLevel(2)
  )
  const updated = reduceStock(product, createQuantity(10)) // ❌ only 2 in stock
  console.log(updated)
})

// ============================================================
// TEST 7 — Price update event
// ============================================================

runTest("Emit a PriceUpdated event", () => {
  const product = createProduct(
    createProductName("Shirt"),
    createPrice(35),
    createStockLevel(15)
  )
  const newPrice = createPrice(45)

  emit({
    type: "PriceUpdated",
    productId: product.id,
    oldPrice: product.price,
    newPrice,
  })
})
