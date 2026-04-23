# Testing Strategy

This project employs a dual-layered testing approach to ensure reliability and robustness.

## Whitebox Testing
Whitebox testing focuses on the internal structure and logic of the code.

### 1. Statement & Block Coverage
We ensure that every line of code in `game.js` is executed at least once during the test suite.

### 2. Path & Condition Coverage
The `determineRoundResult` function contains multiple nested if/else blocks. Our tests cover every possible logical path (e.g., Rock vs Paper, Paper vs Scissors, etc.) to ensure no edge case is left unhandled.

## Blackbox Testing
Blackbox testing focuses on the specifications and requirements without looking at the internal code.

### 1. Boundary Value Analysis (BVA)
We test the `bestOf` parameter in the `RPSGame` constructor at its boundaries:
- **Minimum**: 1 (Valid)
- **Below Minimum**: 0 (Invalid)
- **Maximum**: 99 (Valid)
- **Above Maximum**: 101 (Invalid)
- **Even Number**: 2 (Invalid - requires odd for no draws)

### 2. Equivalence Class Partitioning (ECP)
We partition the inputs for move validation:
- **Valid Class**: `{'rock', 'paper', 'scissors'}` (including variations like ` ' ROCK '`).
- **Invalid Class**: `{'lizard', 123, null, undefined}`.

## Automation
Tests are automated using **Jest** and integrated into the CI/CD pipeline.
- **Framework**: Jest
- **CI Tool**: GitHub Actions
- **Coverage Tool**: Istanbul (built-in to Jest)
