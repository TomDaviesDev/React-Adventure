function RollD4(min, max) {
	min = Math.ceil(1);
	max = Math.floor(4);
	let result = Math.floor(Math.random() * (max - min + 1)) + min;
	return result;
}

export default RollD4;