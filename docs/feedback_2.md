# Peer Review Feedback

## General Feedback
Great job on the domain implementation! Your logic for the Product entity is clean and clearly follows the business rules we discussed in class. The separation between domain and infrastructure layers is well done.

## Specific Checks

**Branded Types ✅**  
You are using unique symbol for all 5 domain values (ProductId, ProductName, PriceNumber, StockLevel, Quantity) which is actually stronger than the guide's example. Each type can only be created through its factory function — no raw primitives anywhere.

**Validation ✅**  
Every factory function throws meaningful errors for impossible data. createPrice rejects zero and negatives, createStockLevel rejects decimals and negatives, createProductName validates against a fixed catalog. The app never crashes silently.

**Observers ✅**  
The Observer type correctly accepts a single DomainEvent argument:  
`type Observer = (event: DomainEvent) => void`.  
Both sendEmailMock and saveToDatabaseMock share this exact signature — no mismatch.

**Readonly in Events ✅**  
All fields in ProductCreatedEvent, PriceUpdatedEvent and StockReducedEvent are marked readonly, preventing observers from accidentally mutating event data.

**Try/Catch ✅**  
All 3 impossible data tests (negative price, invalid name, stock below zero) are wrapped in try/catch blocks and handled gracefully without crashing the app.

## Strengths

- Excellent use of `createProductId()` as a named factory — keeps branding consistent across the entire codebase.
- The `reduceStock` logic correctly enforces the business rule that stock can never drop below zero.
- The `emit()` function uses a unique name per event type (`[Emitter:ProductCreated]`) making it easy for observers to identify and react accordingly.
- `docs/domain.md` clearly documents the business rules in plain English.

## Final verdict
This is ready to merge.