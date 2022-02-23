import React from 'react';
import ItemInfo from './itemInfo.js';

let inventoryNames;
let buttonPos;
let weapons;
let useableItems;
class Items extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showItemInfo: false};
		this.timeOutId = null;
	}
	
	componentDidMount(key) { //Add the names of items to each rendered item button.
		const inventoryPrint = () => {
			let inventoryContents = this.props.inventoryContents.slice();
			inventoryNames = inventoryContents.map(item => item.name);
		};
		inventoryPrint();
		switch(key) {
			default:
				return "There should be an item here."
			case key:
				return inventoryNames[key];
		};
	};
	
	componentDidUpdate() { //Position the itemInfo component based on the button position from itemClick. (Not perfectly centered but correct about 99% of the time I think, as good as can be.)
		if (this.state.showItemInfo) {
			const infoPosition = () => {
				document.getElementsByClassName("itemInfo")[0].style.left = (buttonPos.left + buttonPos.width + 20) + "px";
				document.getElementsByClassName("itemInfo")[0].style.top = (buttonPos.top - (document.getElementsByClassName("itemInfo")[0].getBoundingClientRect().height / 3)) + "px";
			};
			infoPosition();
		};
	};
	
	componentWillUnmount() { //Stop extra stuff happening on the itemInfo component when it's already unmounted (optimization!).
		this.setState({showItemInfo: false});
		clearTimeout(this.timeOutId);
	}
	
	itemSelect() { //Render rows of items based on the value of inventoryContents prop.
		let items = [];
		if (this.props.value !== "combat") {
			for (let x = 0; x < this.props.inventoryContents.length; x++) {
				items.push(<div className="item" data-value={x} key={x} onClick={this.itemClick} onKeyDown={this.keyCheck} tabIndex="0">{this.componentDidMount(x)}</div>)
			};
		} else { //Render weapon swaps and items to use in combat.
			if (this.props.weaponSwap) { //Weapons
				let inventoryContents = this.props.inventoryContents.slice();
				weapons = inventoryContents.filter(item => item.equipSlot === "weapon");
				items.push(<div className="weapon" id="combatChangeWeaponCurrent" data-value={this.props.equippedItems.weapon.id} key={this.props.equippedItems.weapon.name} onClick={this.itemClick} onKeyDown={this.keyCheck} tabIndex="0">{this.props.equippedItems.weapon.name} (Equipped)</div>)
				for (let x = 0; x < weapons.length; x++) {
					items.push(<div className="weapon" id="combatChangeWeaponSelect" data-value={x} key={weapons[x].name} onClick={this.itemClick} onKeyDown={this.keyCheck} tabIndex="0">{weapons[x].name}</div>)
				};
				items.push(<div className="action" id="combatKeepWeapon" key="keepWeapon" onClick={this.keepWeapon} onKeyDown={this.keyCheck} tabIndex="0">Cancel</div>);
			} else if (this.props.combatItem) { //Useable items
				let inventoryContents = this.props.inventoryContents.slice();
				useableItems = inventoryContents.filter(item => item.useable === true && item.id !== 9);
				for (let x = 0; x < useableItems.length; x++) {
					items.push(<div className="item" id="combatUseItemSelect" data-value={x} key={useableItems[x].name + x} onClick={this.itemClick} onKeyDown={this.keyCheck} tabIndex="0">{useableItems[x].name}</div>)
				};
				items.push(<div className="action" id="combatCancelItems" key="cancelItems" onClick={this.cancelItems} onKeyDown={this.keyCheck} tabIndex="0">Cancel</div>);
			};
		};
		return items;
	};
	
	keyCheck = (event) => {if (event.keyCode === 32) { //Confirm if the space bar is pressed for accessibility purposes.
		switch(event.target.id) {
			default:
				break;
			case "combatChangeWeaponSelect":
				this.itemClick(event);
				break;
			case "combatChangeWeaponCurrent":
				this.itemClick(event);
				break;
			case "combatKeepWeapon":
				this.keepWeapon();
				break;
			case "combatUseItemSelect":
				this.itemClick(event);
				break;
			case "combatUseItem":
				this.cancelItems();
				break;
		};
	}};
	
	keepWeapon = () => { //Unmounts above weapons filter and keeps current.
		this.props.weaponSwapHandler(false);
	};
	
	cancelItems = () => {
		this.props.combatItemHandler(false); //Unmounts useable items.
	};
	
	itemClick = (event) => { //Show the itemInfo component and get the position of the button.
		if (this.props.value !== "combat") {
			if (this.state.showItemInfo === false) {
				let item = this.props.inventoryContents[event.target.dataset.value];
				buttonPos = event.target.getBoundingClientRect();
				this.setState({showItemInfo: item});
			};
		} else {
			if (this.state.showItemInfo === false) {
				if (this.props.weaponSwap) {
					if (event.target.id === "combatChangeWeaponCurrent") {
						let item = this.props.equippedItems.weapon;
						buttonPos = event.target.getBoundingClientRect();
						this.setState({showItemInfo: item});
					} else {
						let item = weapons[event.target.dataset.value];
						buttonPos = event.target.getBoundingClientRect();
						this.setState({showItemInfo: item});
					};
				} else if (this.props.combatItem) { //Relocate healing indicator.
					let item = useableItems[event.target.dataset.value];
					buttonPos = event.target.getBoundingClientRect();
					this.setState({showItemInfo: item})
				};
			};
		}
	};
	
	handleTooltipDismiss = () => { //Dismiss the itemInfo component.
		this.timeOutId = setTimeout(() => {
			this.setState({showItemInfo: false});
		});
	};
	
	handleTooltipFocus = () => { //Cancel the above function when the component is focused.
		clearTimeout(this.timeOutId);
	};
	
	render() {
		return <div id="itemContainer">
			{this.props.value !== "combat" ? 
				<p className="itemsTitle">Items</p>
			:
				<p className="combatItemsTitle">You may use one item or change one weapon per turn, in addition to attacking.</p>
			}
			<div className="itemContainerOverflow">
				{this.itemSelect()}
			</div>
			{this.state.showItemInfo ? <ItemInfo {...this.props} {...this.state} dismiss={this.handleTooltipDismiss} focus={this.handleTooltipFocus}/> : null}
		</div>
	};
};
		
export default Items