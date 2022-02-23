import React from 'react';
import HitPointsUpdate from './hitPointsUpdate.js';

class HitPoints extends React.Component {
	
	playerHitPointsColour = () => { //Changes the colour of the player's hit point indicator.
		if (this.props.hitPoints >= (this.props.maxHitPoints / 3 * 2)) {
			return <span className="green">{this.props.hitPoints}</span>
		} else if (this.props.hitPoints > (this.props.maxHitPoints / 3)) {
			return <span className="yellow">{this.props.hitPoints}</span>
		} else {
			return <span className="red">{this.props.hitPoints}</span>
		};
	};
	
	render() {
		return <div className="hitPointsDiv">
			<p>Your HP: {this.playerHitPointsColour()} / <span className="green">{this.props.maxHitPoints}</span></p>
			{this.props.healing > 0 ? <HitPointsUpdate {...this.props} /> : null}
		</div>
	}
}

export default HitPoints;