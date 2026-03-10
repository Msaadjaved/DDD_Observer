General Feedback:
Really solid implementation! The DDD structure is well thought out and the Observer Pattern is correctly applied. I went through the files carefully and the business logic is properly reflected in the code. A couple of minor suggestions below but nothing blocking.
Specific Checks:

Brand Test — unique symbol is used correctly in types.ts. Notably stronger than a plain string literal brand — TypeScript will catch any accidental type mixups at compile time.
Error Test — I checked createPrice: passing 0 or -50 correctly throws "Price must be greater than zero". Passing NaN also throws. No silent failures.
Observer Test — The Observer type contract is properly defined and both mock functions match the DomainEvent signature exactly. No raw strings or multiple arguments being passed.
Readonly Test — All domain events use readonly fields. Observers cannot accidentally mutate the event payload.

Minor Suggestions:

In factories.ts, the as ProductId cast inside createProductId() is the only place where a raw cast appears — which is exactly correct. Worth keeping an eye that no future developer adds casts outside of factory functions.
The guide example uses "PriceNumber" string literal branding — your use of unique symbol is actually the better TypeScript practice, just be ready to explain the difference if asked.

Strengths:

Clean file separation following the DDD structure exactly as specified.
reduceStock enforces the core business rule perfectly.
7 test cases cover both valid and impossible scenarios comprehensively.
Named emitter pattern makes event tracing straightforward.

Recommendation: Code is clean, well structured and all business rules are enforced. This is ready to merge. Approving.