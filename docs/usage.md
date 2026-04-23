# Usage Guide

This guide explains how to set up the Rock Paper Scissors project and use its core features.

## Prerequisites
- **Node.js**: Version 18 or higher is recommended.
- **npm**: Usually comes bundled with Node.js.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TOPRPS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Game

The game logic is encapsulated in `game.js`. You can integrate it into any JavaScript environment.

### Example Integration

```javascript
const { RPSGame } = require('./game');

// Initialize a "Best of 3" game
const game = new RPSGame(3);

// Play a round
const result = game.playRound('rock', 'scissors');
console.log(result); 
// Output: { roundResult: 'p1', p1Score: 1, p2Score: 0, gameOver: false, winner: null }
```

## Running Tests

To execute the automated testing suite and generate a coverage report:

```bash
npm test
```
