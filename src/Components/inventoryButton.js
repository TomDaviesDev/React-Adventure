import React from 'react';

class InventoryButton extends React.Component {
	inventory = () => this.props.mainHandler("inventory", this.props.inventoryContents.length);

	render() {
		return <div id="characterButton" value="Character" onClick={this.inventory}>Inventory</div>
	}
}

export default InventoryButton;