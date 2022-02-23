function Chambers(props) {
	const chamber = props.chambers[0];
	let action = 0;
	props.chamberHandler(chamber);

	switch(chamber) { //Assigns number of actions for each returned chamber.
		default:
			console.log("No actionNum found for current value.")
			break;
		case 8: //Library
			if (window.$motive !== "curiosity") {
				action = 3;
			} else {
				action = 4;
			}
			break;
		case 9: //Mimic Room
			if (window.$motive === "wealth") {
				action = 1;
			} else {
				action = 3;
			}
			break;
		case 10: //Chasm Room
			action = 3;
			break;
		case 11: //Dark Room
			action = 2;
			break;
		case 12: //Sphinx Room
			action = 2;
			break;
		case 13: //Spikey Room
			action = 2;
			break;
		case 14: //Beny Room
			action = 2;
			break;
	};
	
	return [chamber, action];
}

export default Chambers;