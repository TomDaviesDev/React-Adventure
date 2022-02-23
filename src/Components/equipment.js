import React from 'react';

class Equipment extends React.Component {
	render() {
		return <div id="equipmentDiv">
			<div className="equipmentContainerDiv">
				<div className="equipmentLabel" id="labelHead">Head: </div>
				<div className="equipment" id="equippedHead"onClick={() => this.props.itemUnequipHandler(this.props.equippedItems.head)}>{this.props.equippedItems.head.name}</div>
			</div>
			<div className="equipmentContainerDiv">
				<div className="equipmentLabel" id="labelTorso">Torso: </div>
				<div className="equipment" id="equippedTorso"onClick={() => this.props.itemUnequipHandler(this.props.equippedItems.torso)}>{this.props.equippedItems.torso.name}</div>
			</div>
			<div className="equipmentContainerDiv">
				<div className="equipmentLabel" id="labelLegs">Legs: </div>
				<div className="equipment" id="equippedLegs"onClick={() => this.props.itemUnequipHandler(this.props.equippedItems.legs)}>{this.props.equippedItems.legs.name}</div>
			</div>
			<div className="equipmentContainerDiv">
				<div className="equipmentLabel" id="labelBoots">Boots: </div>
				<div className="equipment" id="equippedBoots"onClick={() => this.props.itemUnequipHandler(this.props.equippedItems.boots)}>{this.props.equippedItems.boots.name}</div>
			</div>
			<div className="equipmentContainerDiv">
				<div className="equipmentLabel" id="labelGloves">Gloves: </div>
				<div className="equipment" id="equippedGloves"onClick={() => this.props.itemUnequipHandler(this.props.equippedItems.gloves)}>{this.props.equippedItems.gloves.name}</div>
			</div>
			<div className="equipmentContainerDiv">
				<div className="equipmentLabel" id="labelWeapon">Weapon: </div>
				<div className="equipment" id="equippedWeapon" onClick={() => this.props.itemUnequipHandler(this.props.equippedItems.weapon)}>{this.props.equippedItems.weapon.name}</div>
			</div>
		</div>
	}
}

export default Equipment;