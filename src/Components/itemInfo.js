import React from 'react';
import RollD4 from './Dice/d4.js';
import RollD6 from './Dice/d6.js';
import RollD8 from './Dice/d8.js';
import RollD10 from './Dice/d10.js';
import RollD12 from './Dice/d12.js';
import RollD20 from './Dice/d20.js';
import SpellList from './spellList.js';

function ItemInfo(props) {
	const dismiss = () => props.dismiss();
	const focus = () => props.focus();
	
	function itemBonus() { //Calculates stat bonus to display for weapon damage and adds magical bonus damage.
		switch(props.showItemInfo.stat) {
		case "strength":
			return Math.floor(props.stats.stat.strength / 4) + props.showItemInfo.bonus;
		case "dexterity":
			return Math.floor(props.stats.stat.dexterity / 4) + props.showItemInfo.bonus;
		case "intelligence":
			return Math.floor(props.stats.stat.intelligence / 4) + props.showItemInfo.bonus;
		case "vitality":
			return Math.floor(props.stats.stat.vitality / 2) + props.showItemInfo.bonus;
		default:
			break;
		};
	};
	
	const itemEquip = (event) => { //Equips item.
		let inventoryContents = props.inventoryContents.slice();
		let itemName = event.target.parentElement.firstChild.innerText;
		let item = inventoryContents.find((item) => item.name === itemName);
		props.itemEquipHandler(item);
		dismiss();
	};
	
	const itemUse = (event) => { //Uses item.
		let inventoryContents = props.inventoryContents.slice();
		let itemName = event.target.parentElement.firstChild.innerText;
		let item = inventoryContents.find((item) => item.name === itemName);
		if (item.hasOwnProperty("healing")) { //Healing Potions
			if (props.hitPoints < props.maxHitPoints) {
				const healing = (roll, multiplier) => {
					let result = 0;
					switch(roll) {
						default:
							break;
						case "d4":
							for(let n = 0; n < multiplier; n++) {
								result += RollD4();
							};
							return result + Math.floor(props.stats.stat.vitality / 2);
						case "d6":
							for(let n = 0; n < multiplier; n++) {
								result += RollD6();
							};
							return result + Math.floor(props.stats.stat.vitality / 2);
						case "d8":
							for(let n = 0; n < multiplier; n++) {
								result += RollD8();
							};
							return result + Math.floor(props.stats.stat.vitality / 2);
						case "d10":
							for(let n = 0; n < multiplier; n++) {
								result += RollD10();
							};
							return result + Math.floor(props.stats.stat.vitality / 2);
						case "d12":
							for(let n = 0; n < multiplier; n++) {
								result += RollD12();;
							};
							return result + Math.floor(props.stats.stat.vitality / 2);
						case "d20":
							for(let n = 0; n < multiplier; n++) {
								result += RollD20();;
							};
							return result + Math.floor(props.stats.stat.vitality / 2);
					};
				};
				const heal = healing(item.healing.substring(item.healing.length, item.healing.indexOf('d')), item.healing.substring(0, item.healing.indexOf('d')));
				props.hitPointsUpdate(heal);
				props.inventoryRemove(item.id);
			};
		} else if (item.id === 9) { //Spell Scrolls
			if (props.equippedItems.weapon.id === 3 || props.inventoryContents.find(item => item.id === 3)) {
				if (props.spellbook.length !== SpellList.length) {
					props.spellPickerHandler();
					props.mainHandler("spellScroll", 1);
				} else {
					window.$spellPickerValueSnapshot = props.value;
					props.mainHandler("allSpells", 1);
				};
				props.inventoryRemove(item.id);
			} else {
				props.mainHandler("spellScrollNoSpellbook", 1);
			};
		};
		if (props.value === "combat") {
			props.combatItemHandler(false);
			props.combatLock(true);
		};
		dismiss();
	};
	
	React.useEffect(() => {
		document.getElementsByClassName("itemInfo")[0].focus();
	});
	return <span className="itemInfo" tabIndex="0" onBlur={() => {dismiss()}}>
		<h3>{props.showItemInfo.name}</h3>
		<p>{props.showItemInfo.description}</p>
		{props.showItemInfo.damage &&
			<p className="bold">Damage: {props.showItemInfo.damage.substring(0, props.showItemInfo.damage.indexOf('d'))}-{Number(props.showItemInfo.damage.substring(0, props.showItemInfo.damage.indexOf('d')) * props.showItemInfo.damage.substring(props.showItemInfo.damage.length, props.showItemInfo.damage.indexOf('d')+1))} + {itemBonus()}</p>
		}
		{props.showItemInfo.armour &&
			<p className="bold">Armour: {props.showItemInfo.armour}</p>
		}
		{props.showItemInfo.healing &&
			<p className="bold">Heals {props.showItemInfo.healing.substring(0, props.showItemInfo.healing.indexOf('d'))}-{Number(props.showItemInfo.healing.substring(0, props.showItemInfo.healing.indexOf('d')) * props.showItemInfo.healing.substring(props.showItemInfo.healing.length, props.showItemInfo.healing.indexOf('d')+1))} + {itemBonus()}</p>
		}
		{props.showItemInfo.equipable === true ?
			props.showItemInfo.id !== props.equippedItems.weapon.id ?
				props.showItemInfo.hasOwnProperty("level") ?
					props.stats.stat[props.showItemInfo.stat] >= props.showItemInfo.level ?
						<input type="button" className="itemEquipButton" value="Equip" onFocus={() => {focus()}} onClick={(event) => {itemEquip(event)}}></input>
					: <p className="bold">Requires {props.showItemInfo.level} {props.showItemInfo.stat} to equip.</p>
				: <input type="button" className="itemEquipButton" value="Equip" onFocus={() => {focus()}} onClick={(event) => {itemEquip(event)}}></input>
			: null
		: null
		}
		{props.showItemInfo.useable === true &&
			<input type="button" className="itemUseButton" value="Use" onFocus={() => {focus()}} onClick={(event) => {itemUse(event)}}></input>
		}
	</span>
}

export default ItemInfo;