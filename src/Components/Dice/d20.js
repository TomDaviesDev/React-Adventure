function RollD20(min, max) {
	min = Math.ceil(1);
	max = Math.floor(20);
	let result = Math.floor(Math.random() * (max - min + 1)) + min;
	return result;
}

export default RollD20;