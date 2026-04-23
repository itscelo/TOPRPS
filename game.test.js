const { MOVES, isValidMove, determineRoundResult, RPSGame } = require('./game');

describe('Rock Paper Scissors Game Logic', () => {

    describe('isValidMove (ECP & BVA)', () => {
        test('should return true for valid moves (ECP - Valid Class)', () => {
            expect(isValidMove('rock')).toBe(true);
            expect(isValidMove('paper')).toBe(true);
            expect(isValidMove('scissors')).toBe(true);
        });

        test('should return true for valid moves with whitespace and mixed case (ECP - Valid Class)', () => {
            expect(isValidMove('  ROCK  ')).toBe(true);
            expect(isValidMove('pApEr')).toBe(true);
        });

        test('should return false for invalid strings (ECP - Invalid Class)', () => {
            expect(isValidMove('lizard')).toBe(false);
            expect(isValidMove('spock')).toBe(false);
            expect(isValidMove('')).toBe(false);
        });

        test('should return false for non-string inputs (ECP - Invalid Class)', () => {
            expect(isValidMove(null)).toBe(false);
            expect(isValidMove(undefined)).toBe(false);
            expect(isValidMove(123)).toBe(false);
            expect(isValidMove({})).toBe(false);
        });
    });

    describe('determineRoundResult (Whitebox - Path/Condition Coverage)', () => {
        test('should return "draw" when both moves are the same', () => {
            expect(determineRoundResult('rock', 'rock')).toBe('draw');
            expect(determineRoundResult('paper', 'paper')).toBe('draw');
            expect(determineRoundResult('scissors', 'scissors')).toBe('draw');
        });

        test('should return "p1" when p1 wins', () => {
            expect(determineRoundResult('rock', 'scissors')).toBe('p1');
            expect(determineRoundResult('paper', 'rock')).toBe('p1');
            expect(determineRoundResult('scissors', 'paper')).toBe('p1');
        });

        test('should return "p2" when p2 wins', () => {
            expect(determineRoundResult('rock', 'paper')).toBe('p2');
            expect(determineRoundResult('paper', 'scissors')).toBe('p2');
            expect(determineRoundResult('scissors', 'rock')).toBe('p2');
        });

        test('should throw error for invalid moves', () => {
            expect(() => determineRoundResult('rock', 'fire')).toThrow('Invalid input');
            expect(() => determineRoundResult('water', 'rock')).toThrow('Invalid input');
        });
    });

    describe('RPSGame Class (BVA & State Transition)', () => {
        
        describe('Constructor (BVA)', () => {
            test('should create a game with valid bestOf (BVA - Boundary 1)', () => {
                const game = new RPSGame(1);
                expect(game.bestOf).toBe(1);
                expect(game.winThreshold).toBe(1);
            });

            test('should create a game with valid bestOf (BVA - Boundary 99)', () => {
                const game = new RPSGame(99);
                expect(game.bestOf).toBe(99);
                expect(game.winThreshold).toBe(50);
            });

            test('should throw error for non-number (ECP)', () => {
                expect(() => new RPSGame('3')).toThrow('BestOf must be a number');
            });

            test('should throw error for 0 or negative (BVA - Boundary 0)', () => {
                expect(() => new RPSGame(0)).toThrow('greater than 0');
                expect(() => new RPSGame(-1)).toThrow('greater than 0');
            });

            test('should throw error for even numbers (BVA)', () => {
                expect(() => new RPSGame(2)).toThrow('must be an odd number');
            });

            test('should throw error for numbers over 99 (BVA - Boundary 100)', () => {
                expect(() => new RPSGame(101)).toThrow('cannot exceed 99');
            });
        });

        describe('Game Flow', () => {
            test('should play until a winner is decided (Best of 3)', () => {
                const game = new RPSGame(3); // Needs 2 wins
                
                // Round 1
                let state = game.playRound('rock', 'scissors'); // p1 wins
                expect(state.p1Score).toBe(1);
                expect(state.gameOver).toBe(false);

                // Round 2
                state = game.playRound('paper', 'paper'); // draw
                expect(state.p1Score).toBe(1);
                expect(state.p2Score).toBe(0);
                expect(state.gameOver).toBe(false);

                // Round 3
                state = game.playRound('rock', 'paper'); // p2 wins
                expect(state.p2Score).toBe(1);
                expect(state.gameOver).toBe(false);

                // Round 4
                state = game.playRound('scissors', 'paper'); // p1 wins -> p1 reaches 2 wins
                expect(state.p1Score).toBe(2);
                expect(state.gameOver).toBe(true);
                expect(state.winner).toBe('p1');
            });

            test('should play until a winner is decided (P2 wins)', () => {
                const game = new RPSGame(1);
                const state = game.playRound('scissors', 'rock');
                expect(state.p2Score).toBe(1);
                expect(state.gameOver).toBe(true);
                expect(state.winner).toBe('p2');
            });

            test('should not allow playing after game is over', () => {
                const game = new RPSGame(1);
                game.playRound('rock', 'scissors');
                expect(game.gameOver).toBe(true);
                
                const result = game.playRound('paper', 'rock');
                expect(result.error).toBe('Game is already over.');
            });
        });

        describe('getGameState', () => {
            test('should return correct game summary', () => {
                const game = new RPSGame(5);
                game.playRound('rock', 'scissors');
                const state = game.getGameState();
                expect(state.bestOf).toBe(5);
                expect(state.p1Score).toBe(1);
                expect(state.roundsPlayed).toBe(1);
            });
        });
    });
});
