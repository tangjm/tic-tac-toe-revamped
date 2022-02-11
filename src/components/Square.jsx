import React from 'react';
import PropTypes from 'prop-types';

function Square(props) {
	const { isHighlighted, onClick, value } = props;

	return (
		<button className={isHighlighted ? "square winningSquare" : "square"}
			onClick={onClick}>
			{value}
		</button>
	);
}

Square.propTypes = {
	isHighlighted: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	value: PropTypes.oneOf(["X", "O", null]),
}

export default Square;