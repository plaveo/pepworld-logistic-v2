# PEPWORLD Logistics V2 Build Rules

1. Do not modify the current live Logistics Intelligence application from this repository.
2. Do not write to Zebra, CIS or any production database without an explicit approved data-connection task.
3. Keep 120 engine cards, 50 UI modules and 12 map cards as separate component classes.
4. Map cards explain results; they do not create their own GO / CAUTION / AVOID decisions.
5. Never fabricate capacity, availability, utilization, route time, coordinates, verification or evidence.
6. Preserve status, missing-input, confidence, freshness and release-state fields through every layer.
7. Display source lineage from raw record to map output whenever evidence is available.
8. Label demonstrations and mock payloads visibly.
