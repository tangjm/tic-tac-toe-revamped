import React, { useState, useEffect } from 'react'

const DateTime = props => {
	const [time, setTime] = useState(new Date().toLocaleString());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(time => new Date().toLocaleString());
		}, 1000);
		return () => clearInterval(timer);
	}, [time])

	return (
		<span id="time">
			{time}
		</span>
	)
}

export default DateTime;