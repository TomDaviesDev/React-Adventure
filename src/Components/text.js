import React from 'react';
import Content from './content.js';
import Inventory from './inventory.js';
import InventoryButton from './inventoryButton.js'
import CombatContent from './combatContent.js';

class Text extends React.Component {	
	getSnapshotBeforeUpdate(prevProps) {
		return prevProps;
	};
	
	componentDidUpdate(prevProps) {
		const value = (prevProps.value);
		const actionNum = (prevProps.actionNum);
		if (value !== "inventory") {
			if (value !== "spellScroll") {
				if (value !== "spellScrollNoSpellbook") {
					if (value !== "allSpells") {
						window.$inventoryValueSnapshot = value;	
						window.$inventoryActionSnapshot = actionNum;
					};
				};
			};
		};
	};
	
	render = () => {
		if (this.props.value === "inventory") {
			return <div className="text">
				<Inventory  {...this.props}
							mainHandler={this.props.mainHandler}
							statsHandler={this.props.statsHandler}
							allocateHandler={this.props.allocateHandler}
							inventoryHandler={this.props.inventoryHandler}
							itemUnequipHandler={this.props.itemUnequipHandler}/>
			</div>
		} else if (this.props.value === "combat") {
			return <div className="text">
				<CombatContent {...this.props}
							   mainHandler={this.props.mainHandler}
							   statsHandler={this.props.statsHandler}
							   allocateHandler={this.props.allocateHandler}/>
			</div>
		} else if (this.props.value <= 3){
			return <div className="text">
				<Content {...this.props}
						 mainHandler={this.props.mainHandler}
						 statsHandler={this.props.statsHandler}
						 allocateHandler={this.props.allocateHandler}/>
			</div>
		} else {
			return <div className="text">
				{this.props.value !== "emptySpell" ?
					this.props.value !== "8fire" ?
						this.props.value !== "spellScroll" ?
							this.props.value !== "spellScrollNoSpellbook" ?
								this.props.value !== "allSpells" ?
									<InventoryButton {...this.props}
													 mainHandler={this.props.mainHandler}
													 inventoryContents={this.props.inventoryContents}/>
								: null
							: null
						: null
					: null
				: null}
								 
			 	<Content {...this.props}
						 mainHandler={this.props.mainHandler}
						 statsHandler={this.props.statsHandler}
						 allocateHandler={this.props.allocateHandler}/>
			</div>
		};
	};
};

export default Text;