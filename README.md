# Rock Paper Scissors - University Project

This project implements a robust Rock Paper Scissors engine with a focus on CI/CD and automated testing (Whitebox & Blackbox).

## 🚀 Usage Guide

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Running Tests
To run the full test suite with coverage report:
```bash
npm test
```

### Core Logic (`game.js`)
The `game.js` file contains the pure logic separated from any UI. It features:
- **Move Validation**: Ensures only 'rock', 'paper', or 'scissors' are accepted.
- **Best of N**: Supports multi-round games (e.g., Best of 3, Best of 5).
- **Branching Complexity**: Designed to demonstrate high statement, block, and path coverage.

## 📊 Testing Strategy

### Whitebox Tests
- **Path Coverage**: Every possible win/loss/draw combination in `determineRoundResult` is tested.
- **Condition Coverage**: Logical operators and multiple conditions within the `RPSGame` class are exercised.

### Blackbox Tests
- **Boundary Value Analysis (BVA)**:
    - `bestOf` parameter tested at: 0, 1, 2, 99, 100.
- **Equivalence Class Partitioning (ECP)**:
    - **Valid Class**: {'rock', 'paper', 'scissors'} (including case sensitivity and whitespace).
    - **Invalid Class**: {null, undefined, numbers, random strings}.

## 📑 Data Model & Schema

### Input Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `bestOf` | Number | Total rounds for the game (must be positive odd number < 100). |
| `move` | String | User choice: 'rock', 'paper', or 'scissors'. |

### Game State (JSON)
The `getGameState()` method returns an object with the following structure:

```json
{
  "bestOf": 3,
  "winThreshold": 2,
  "p1Score": 1,
  "p2Score": 0,
  "gameOver": false,
  "winner": null,
  "roundsPlayed": 1
}
```

### Round Result (JSON)
The `playRound()` method returns a result summary:

```json
{
  "roundResult": "p1",
  "p1Score": 1,
  "p2Score": 0,
  "gameOver": false,
  "winner": null
}
```

## 🔗 CI/CD Pipeline
The project uses GitHub Actions (`.github/workflows/main.yml`) to:
1. **Automate Testing**: Runs `npm test` on every push and pull request to the `main` branch.
2. **Matrix Build**: Validates the code against multiple Node.js versions (18.x, 20.x).
3. **Deployment Placeholder**: Includes a structured job for cloud deployment (e.g., Firebase, Netlify).
 
