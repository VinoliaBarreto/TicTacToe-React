import React, { useState } from "react";
import Square from "./square.jsx";
import PropTypes from "prop-types";

const Home = () => {
	//We start to declare our consts using Hooks (useState)
	const [turn, changeTurn] = useState(true);
	const [boardValue, setBoardValue] = useState(Array(9).fill(null));
	const [state, setState] = useState("Player 1 starts");

	const saveSquareValue = (value, squarePosition) => {
		const squares = [...boardValue];
		squares[squarePosition] = value;
		setBoardValue(squares);

		// Who is the winner??
		let winner = whoIsTheWinner(squares);

		if (winner === true) {
			setState("Winner: Player 1!!");
		} else if (winner === false) {
			setState("Winner: Player 2!!");
		} else if (winner === null) {
			setState("Player: " + (turn ? "2" : "1") + ", your turn!");
		}
	};

	//Change the turn/player
	const changeValue = () => {
		changeTurn(!turn);
	};

	let board = [];
	for (let i = 0; i < 9; i++) {
		board.push(
			<Square
				key={i.toString()}
				squarePosition={i}
				turn={turn}
				valueFunction={changeValue}
				saveValues={saveSquareValue}
				checkWinner={whoIsTheWinner}
			/>
		);
	}
	// Declaration of conditions for the winner.
	const whoIsTheWinner = squares => {
		const condition = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for (let i = 0; i < condition.length; i++) {
			const [a, b, c] = condition[i];
			if (
				squares[a] != null &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	};

	// We return a tittle, the player, the board.
	return (
		<div className="container d-flex flex-column ">
			<div className="title">Tic Tac Toe</div>
			<div className="state title">{state}</div>
			<div className="row justify-content-center">
				{" "}
				{board[0]} {board[1]} {board[2]}{" "}
			</div>
			<div className="row justify-content-center">
				{" "}
				{board[3]} {board[4]} {board[5]}{" "}
			</div>
			<div className="row justify-content-center">
				{" "}
				{board[6]} {board[7]} {board[8]}{" "}
			</div>
		</div>
	);
};

export default Home;
