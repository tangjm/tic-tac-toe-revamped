import React from 'react';

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
			<p>{props.cool}</p>
		</button>
	);
}

export default Square;