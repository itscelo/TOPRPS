/**
 * game.js
 * Core logic for Rock Paper Scissors university project.
 * Focuses on Best of N feature and move validation with high branch complexity for coverage demonstration.
 */

const MOVES = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
};

/**
 * Validates if the move is a valid RPS move.
 * Demonstrates Equivalence Class Partitioning (ECP).
 */
function isValidMove(move) {
    if (move === null || move === undefined) {
        return false;
    }
    
    if (typeof move !== 'string') {
        return false;
    }

    const normalizedMove = move.trim().toLowerCase();
    
    if (normalizedMove === MOVES.ROCK) return true;
    if (normalizedMove === MOVES.PAPER) return true;
    if (normalizedMove === MOVES.SCISSORS) return true;
    
    return false;
}

/**
 * Determines the winner of a single round.
 * Demonstrates high path and condition coverage.
 */
function determineRoundResult(p1Move, p2Move) {
    if (!isValidMove(p1Move) || !isValidMove(p2Move)) {
        throw new Error('Invalid input: both players must provide a valid move (rock, paper, or scissors).');
    }

    const m1 = p1Move.trim().toLowerCase();
    const m2 = p2Move.trim().toLowerCase();

    // Condition & Path Coverage focus
    if (m1 === m2) {
        return 'draw';
    }

    if (m1 === MOVES.ROCK) {
        if (m2 === MOVES.SCISSORS) {
            return 'p1';
        } else {
            // m2 must be paper
            return 'p2';
        }
    } else if (m1 === MOVES.PAPER) {
        if (m2 === MOVES.ROCK) {
            return 'p1';
        } else {
            // m2 must be scissors
            return 'p2';
        }
    } else if (m1 === MOVES.SCISSORS) {
        if (m2 === MOVES.PAPER) {
            return 'p1';
        } else {
            // m2 must be rock
            return 'p2';
        }
    }
    
    // This part should technically be unreachable if isValidMove is correct, 
    // but good for "uncovered path" demonstration if needed.
    return 'unknown';
}

/**
 * RPSGame Class to manage "Best of N" logic.
 */
class RPSGame {
    /**
     * @param {number} bestOf - Total rounds (must be positive odd number).
     */
    constructor(bestOf = 3) {
        // Boundary Value Analysis (BVA) targets here
        if (typeof bestOf !== 'number') {
            throw new Error('BestOf must be a number.');
        }

        if (bestOf <= 0) {
            throw new Error('BestOf must be greater than 0.');
        }

        if (bestOf > 99) {
            throw new Error('BestOf cannot exceed 99 for this implementation.');
        }

        if (bestOf % 2 === 0) {
            throw new Error('BestOf must be an odd number to prevent draws in the overall game.');
        }

        this.bestOf = bestOf;
        this.winThreshold = Math.ceil(bestOf / 2);
        this.p1Score = 0;
        this.p2Score = 0;
        this.rounds = [];
        this.gameOver = false;
        this.winner = null;
    }

    playRound(p1Move, p2Move) {
        if (this.gameOver) {
            return {
                error: 'Game is already over.',
                winner: this.winner,
                p1Score: this.p1Score,
                p2Score: this.p2Score
            };
        }

        const result = determineRoundResult(p1Move, p2Move);
        
        const roundData = {
            roundNumber: this.rounds.length + 1,
            p1Move,
            p2Move,
            result
        };
        
        this.rounds.push(roundData);

        if (result === 'p1') {
            this.p1Score++;
        } else if (result === 'p2') {
            this.p2Score++;
        }
        // Draws don't increment score in Best of N

        if (this.p1Score >= this.winThreshold) {
            this.gameOver = true;
            this.winner = 'p1';
        } else if (this.p2Score >= this.winThreshold) {
            this.gameOver = true;
            this.winner = 'p2';
        }

        return {
            roundResult: result,
            p1Score: this.p1Score,
            p2Score: this.p2Score,
            gameOver: this.gameOver,
            winner: this.winner
        };
    }

    getGameState() {
        return {
            bestOf: this.bestOf,
            winThreshold: this.winThreshold,
            p1Score: this.p1Score,
            p2Score: this.p2Score,
            gameOver: this.gameOver,
            winner: this.winner,
            roundsPlayed: this.rounds.length
        };
    }
}

module.exports = {
    MOVES,
    isValidMove,
    determineRoundResult,
    RPSGame
};
