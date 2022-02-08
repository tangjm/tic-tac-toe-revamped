import React from 'react';
import PropTypes from 'prop-types';

function Square(props) {
	const { isHighlighted, onClick, value } = props;

	const formatWinningSquare = () => {
		return isHighlighted ? "square winningSquare" : "square";
	}
	return (
		<button className={formatWinningSquare()} onClick={onClick}>
			{value} {console.log(formatWinningSquare())}
		</button>
	);
}

Square.propTypes = {
	isHighlighted: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	value: PropTypes.oneOf(["X", "O", null])
}

export default Square;