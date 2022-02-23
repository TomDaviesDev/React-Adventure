import React from 'react';

class HitPointsUpdate extends React.Component {
	
	componentDidMount = () => {
		let timeout = setTimeout(() => {
			this.props.healingUpdate();
			clearTimeout(timeout);
		}, 4000);
	};
	
	componentWillUnmount() { //Remove timeout if the component is unmounted before the timer runs down.
		clearTimeout(this.timeout);
	};
	
	render() {
		return <span className="hitPointUpdateDisplay green">+{this.props.healing}</span>
	}
}

export default HitPointsUpdate;