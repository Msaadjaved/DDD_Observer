# E-Commerce Inventory Domain

## Overview

This domain models the core business logic of an e-commerce product inventory system.

## Business Rules

- A **Product** must have a valid unique ID, a name from a fixed catalog, a positive price, and a stock level.
- A **Price** can never be negative or zero. Products must cost something.
- A **Stock Level** can never go below zero. You cannot sell what you don't have.
- A **Quantity** must be a positive integer. You cannot order 0 or negative items.
- When stock is reduced, the quantity removed must not exceed the current stock level.

## Domain Events

- `ProductCreated` — fired when a new product is successfully registered.
- `PriceUpdated` — fired when the price of an existing product changes.
- `StockReduced` — fired when stock is decremented following a purchase or reservation.

## Observers (Side Effects)

When domain events occur, the following side effects are triggered:
- An **email notification** is sent (e.g. low stock alert, order confirmation).
- The event is **persisted to the database** for audit and analytics.
- A **notification log** is printed for monitoring purposes.
