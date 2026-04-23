# Data Model & Schema

This section documents the data structures and schemas used by the RPS engine.

## Entities and Attributes

### 1. Game (Entity: `RPSGame`)
Represents a single match consisting of multiple rounds.

| Attribute | Type | Description |
|-----------|------|-------------|
| `bestOf` | Integer | Total rounds to be played (Must be odd). |
| `winThreshold` | Integer | Rounds required to win the game. |
| `p1Score` | Integer | Current score for Player 1. |
| `p2Score` | Integer | Current score for Player 2. |
| `gameOver` | Boolean | Whether the match has concluded. |
| `winner` | String | The winner of the match (`p1`, `p2`, or `null`). |

### 2. Round (Entity: `RoundResult`)
Represents the outcome of a single encounter.

| Attribute | Type | Description |
|-----------|------|-------------|
| `roundNumber` | Integer | The sequence number of the round. |
| `p1Move` | String | Move chosen by Player 1. |
| `p2Move` | String | Move chosen by Player 2. |
| `result` | String | Result of the round (`p1`, `p2`, or `draw`). |

## Relationships
- A **Game** consists of 1 to `N` **Rounds**.
- Each **Round** is associated with exactly one **Game**.

## JSON Schema Representation

### Game State
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "GameState",
  "type": "object",
  "properties": {
    "bestOf": { "type": "integer", "minimum": 1 },
    "winThreshold": { "type": "integer" },
    "p1Score": { "type": "integer" },
    "p2Score": { "type": "integer" },
    "gameOver": { "type": "boolean" },
    "winner": { "type": ["string", "null"] },
    "roundsPlayed": { "type": "integer" }
  }
}
```
