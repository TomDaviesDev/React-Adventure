import React from 'react';

class Gameover extends React.Component {
	
	refreshPage = () => {
		window.location.reload();
	}
	
	render() {
		return <div id="gameover">
			<div>Your adventure is at an end.</div>
			<div>Will you try again?</div>
			<div id="restart" onClick={this.refreshPage}>New Adventure</div>
		</div>
	}
}

export default Gameover;