function RollD8(min, max) {
	min = Math.ceil(1);
	max = Math.floor(8);
	let result = Math.floor(Math.random() * (max - min + 1)) + min;
	return result;
}

export default RollD8;