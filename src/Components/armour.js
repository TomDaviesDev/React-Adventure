import React from 'react';

class Armour extends React.Component {
	
	armourDisplay = () => {
		if (this.props.armour !== undefined) {
			return this.props.armour;
		} else {
			return 0;
		}
	}
	
	render() {
		return <p>Armour Rating: {this.armourDisplay()}</p>
	};
};

export default Armour;