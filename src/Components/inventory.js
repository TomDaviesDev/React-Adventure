import React from 'react';
import Equipment from './equipment.js';
import Statistics from './statistics.js';
import HitPoints from './hitPoints.js';
import Armour from './armour.js';

class Inventory extends React.Component {
	closeInventory = () => {
		this.props.mainHandler(window.$inventoryValueSnapshot, window.$inventoryActionSnapshot);
	}
	render() {
		return <div id="inventoryDiv">
			<div className="hitPoints"><HitPoints {...this.props}/></div>
			<div className="armour"><Armour {...this.props}/></div>
			<Equipment equippedItems={this.props.equippedItems}
					   itemUnequipHandler={this.props.itemUnequipHandler}/>
			<Statistics {...this.props}
						statsHandler={this.props.statsHandler}
						mainHandler={this.props.mainHandler}
						allocateHandler={this.props.allocateHandler}/>
			{this.props.allocate.allocate === false &&
				<div id="closeInventoryButton"onClick={this.closeInventory} aria-label="Close">❌</div>
			}
		</div>
	}
}

export default Inventory;