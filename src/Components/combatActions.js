import React from 'react';
import RollD4 from './Dice/d4.js';
import RollD6 from './Dice/d6.js';
import RollD8 from './Dice/d8.js';
import RollD10 from './Dice/d10.js';
import RollD12 from './Dice/d12.js';
import RollD20 from './Dice/d20.js';
import Items from './items.js';
import Spells from './spells.js';

class CombatActions extends React.Component {
	
	actionRender = () => {
		let actions = [];
		if (this.props.hitPoints > 0) {
			if (this.props.weaponSwap){ //Swap weapon
				actions.push(<Items key="weapons" {...this.props} />);
			} else if (this.props.combatSpell) { //Cast spell
				actions.push(<Spells key="spells" {...this.props} />)
			} else if (this.props.combatItem) { //Use item
				actions.push(<Items key="items" {...this.props} />);
			} else if (this.props.combatTurn === "player") {
				if (this.props.equippedItems.weapon !== "") {
					if (this.props.equippedItems.weapon.id !== 3) {
						actions.push(<div className="action" id="combatAttack" key="attack" onClick={this.attack} onKeyDown={this.keyCheck} tabIndex="0">Attack ({this.props.equippedItems.weapon.name})</div>)
					} else {
						actions.push(<div className="action" id="combatCast" key="cast" onClick={this.cast} onKeyDown={this.keyCheck} tabIndex="0">Cast a Spell</div>)
					}
				};
				if (this.props.inventoryContents.some(item => item.equipSlot === "weapon")) {
					if (this.props.weaponSwapLock === false) {
						actions.push(<div className="action" id="combatChangeWeapon" key="changeWeapon" onClick={this.changeWeapon} onKeyDown={this.keyCheck} tabIndex="0">Change Weapon</div>)
					} else {
						actions.push(<div className="action locked" id="combatChangeWeaponLocked" key="changeWeapon" tabIndex="0">Change Weapon</div>)
					};
				};
				if (this.props.inventoryContents.some(item => item.useable === true && item.id !== 9)) {
					if (this.props.itemUseLock === false) {
						actions.push(<div className="action" id="combatUseItem" key="useItem" onClick={this.useItem} onKeyDown={this.keyCheck} tabIndex="0">Use Item</div>)
					} else {
						actions.push(<div className="action locked" id="combatUseItemLocked" key="useItem" tabIndex="0">Use Item</div>)
					};
				};
			} else {
				actions.push(<div className="action" id="turnContinue" key="turnContinue" onClick={this.turnContinue} onKeyDown={this.keyCheck} tabIndex="0">Continue</div>)
			}
		} else {
			actions.push(<div className="action" id="combatGameOver" key="combatGameOver" onClick={this.gameOver} onKeyDown={this.keyCheck} tabIndex="0">You have been defeated!</div>)
		}
		return actions;
	};
	
	keyCheck = (event) => {if (event.keyCode === 32) { //Confirm if the space bar is pressed for accessibility purposes.
		switch(event.target.id) {
			default:
				break;
			case "combatAttack":
				this.attack();
				break;
			case "combatCast":
				this.cast();
				break;
			case "combatCancelSpell":
				this.cancelSpell();
				break;
			case "combatChangeWeapon":
				this.changeWeapon();
				break;
			case "turnContinue":
				this.turnContinue();
				break;
			case "combatEnd":
				this.combatEnd();
				break;
			case "combatGameOver":
				this.gameOver();
				break;
			case "combatUseItem":
				this.useItem();
				break;
		};
	}};
	
	attack = () => { //Calculates damage from player weapon attacks.
		const bonusDamage = () => {
			switch(this.props.equippedItems.weapon.stat) {
				default:
					break;
				case "strength":
					return Math.floor(this.props.stats.stat.strength / 4);
				case "dexterity":
					return Math.floor(this.props.stats.stat.dexterity / 4);
				case "intelligence":
					return Math.floor(this.props.stats.stat.intelligence / 4);
				case "vitality":
					return Math.floor(this.props.stats.stat.vitality / 4);
			};
		};
		const damage = (roll, multiplier, weaponDamageBonus) => {
			let result = 0;
			switch(roll) {
				default:
					break;
				case "d4":
					for(let n = 0; n < multiplier; n++) {
						result += RollD4();
					};
					return result + bonusDamage() + weaponDamageBonus;
				case "d6":
					for(let n = 0; n < multiplier; n++) {
						result += RollD6();
					};
					return result + bonusDamage() + weaponDamageBonus;
				case "d8":
					for(let n = 0; n < multiplier; n++) {
						result += RollD8();
					};
					return result + bonusDamage() + weaponDamageBonus;
				case "d10":
					for(let n = 0; n < multiplier; n++) {
						result += RollD10();
					};
					return result + bonusDamage() + weaponDamageBonus;
				case "d12":
					for(let n = 0; n < multiplier; n++) {
						result += RollD12();
					};
					return result + bonusDamage() + weaponDamageBonus;
				case "d20":
					for(let n = 0; n < multiplier; n++) {
						result += RollD20();
					};
					return result + bonusDamage() + weaponDamageBonus;
			};
		};
		let weapon = this.props.equippedItems.weapon;
		const attackDamage = damage(weapon.damage.substring(weapon.damage.length, weapon.damage.indexOf('d')), weapon.damage.substring(0, weapon.damage.indexOf('d')), weapon.bonus);
		this.props.enemyHitPointsUpdate(attackDamage);
		this.props.damageDisplay(attackDamage);
		this.props.damageBreakdown((attackDamage - bonusDamage() - weapon.bonus), bonusDamage());
		this.props.turnOrder();
	};
	
	cast = () => { //Mounts spell component.
		this.props.combatSpellHandler(true);
	};
	
	changeWeapon = () => { //Filters weapons to change to.
		this.props.weaponSwapHandler(true);
	};
	
	useItem = () => {
		this.props.combatItemHandler(true); //Filters items to use.
	};
	
	//Unmounting Weapons and Items have been moved to the Items component.
	//Unmounting spells has been moved to the Spell component.
	
	combatEnd = () => { //Handles things at the end of combat.
		this.props.spellDurationClear(5);
		this.props.armourBonusUpdate(0);
		this.props.combatLock(false);
		this.props.allocateHandler(true, this.props.enemy.statPointReward);
		this.props.mainHandler(window.$combatValueSnapshot, 1); //Sets the value after victory to the loot for each battle. ActionNum is set to 1 for "Continue".
	};
	
	gameOver = () => { //Sets Game Over screen after player reaches 0 hit points.
		this.props.gameover();
	};
	
	turnContinue = () => { //Handles what happens when "Continue" is selected on the enemy turn in combat.
		let actions = [];
		let useActions = [];
		let damageArray = [];
		let healingArray = [];
		const enemyActionSelect = () => { //Handles which abilities enemies will use under different conditions.
			switch(this.props.enemy.id) {
				case 1: //Skeleton
					if (this.props.enemy.hitPoints >= (this.props.enemy.maxHitPoints / 2)) {
						actions = ["Sword"];
						break;
					} else {
						actions = ["Sword", "Bone Throw"];
						break;
					}
				case 2: //Mimic
					if (RollD10() > 4) {
						actions = ["Bite"];
						break;
					} else {
						actions = ["Acid"];
						break;
					}
				case 3: //Sphinx
					if (this.props.enemy.hitPoints <= (this.props.enemy.maxHitPoints / 4) && this.props.enemyHealing.length === 0) {
						actions = ["Renewal"];
						break;
					} else if (RollD10() < 4) {
						actions = ["Bite", "Claw"];
						break;
					} else if (RollD8() <= 3) {
						actions = ["Claw"];
						break;
					} else {
						actions = ["Bite"];
						break;
					}
				default:
					break;
			};
			actions.forEach((ability) => {
				const enemyAbilities = this.props.enemy.abilities;
				useActions.push(enemyAbilities.find(enemyAbilities => enemyAbilities.name === ability));
			});
		};
		enemyActionSelect();
		for (let i = 0; i < useActions.length; i++) {
			const ability = useActions[i];
			if (ability.type === "attack") { //Calculates damage from enemy attacks.
					const enemyDamage = (roll, multiplier) => {
						let result = 0;
						switch(roll) {
							default:
								break;
							case "d4":
								for(let n = 0; n < multiplier; n++) {
									result += RollD4();
								};
								return result + ability.damageBonus - this.props.armour;
							case "d6":
								for(let n = 0; n < multiplier; n++) {
									result += RollD6();
								};
								return result + ability.damageBonus - this.props.armour;
							case "d8":
								for(let n = 0; n < multiplier; n++) {
									result += RollD8();
								};
								return result + ability.damageBonus - this.props.armour;
							case "d10":
								for(let n = 0; n < multiplier; n++) {
									result += RollD10();
								};
								return result + ability.damageBonus - this.props.armour;
							case "d12":
								for(let n = 0; n < multiplier; n++) {
									result += RollD12();
								};
								return result + ability.damageBonus - this.props.armour;
							case "d20":
								for(let n = 0; n < multiplier; n++) {
									result += RollD20();
								};
								return result + ability.damageBonus - this.props.armour;
							};
					};
					let damage = enemyDamage(ability.damage.substring(ability.damage.length, ability.damage.indexOf('d')), ability.damage.substring(0, ability.damage.indexOf('d')));
					damageArray.push(damage);
					let finalDamage = damageArray.reduce((a, b) => a + b);
					if (finalDamage > 0) {
						this.props.hitPointsUpdate(-finalDamage);
					};
			} else if (ability.type === "heal") { //Calculates enemy healing.
				const enemyHealing = (roll, multiplier) => {
					let result = 0;
					switch(roll) {
						default:
							break;
						case "d4":
							for(let n = 0; n < multiplier; n++) {
								result += RollD4();
							};
							return result + ability.healBonus;
						case "d6":
							for(let n = 0; n < multiplier; n++) {
								result += RollD6();
							};
							return result + ability.healBonus;
						case "d8":
							for(let n = 0; n < multiplier; n++) {
								result += RollD8();
							};
							return result + ability.healBonus;
						case "d10":
							for(let n = 0; n < multiplier; n++) {
								result += RollD10();
							};
							return result + ability.healBonus;
						case "d12":
							for(let n = 0; n < multiplier; n++) {
								result += RollD12();
							};
							return result + ability.healBonus;
						case "d20":
							for(let n = 0; n < multiplier; n++) {
								result += RollD20();
							};
							return result + ability.healBonus;
						};
				};
				let healing = enemyHealing(ability.healing.substring(ability.healing.length, ability.healing.indexOf('d')), ability.healing.substring(0, ability.healing.indexOf('d')));
				healingArray.push(healing);
				let finalHealing = healingArray.reduce((a, b) => a + b);
				if (finalHealing > 0) {
					this.props.enemyHitPointsUpdate(-finalHealing);
				};
			};
		};
		this.props.enemyActionUpdate(useActions, damageArray, healingArray);
		this.props.turnOrder();
	};
	
	render() {
		if (this.props.enemy.hitPoints > 0) {
			return <div className="actions">
				{this.actionRender()}
			</div>
		} else {
			return <div className="actions">
				<div className="action" id="combatEnd" key="combatEnd" onClick={this.combatEnd} onKeyDown={this.keyCheck} tabIndex="0">Continue</div>
			</div>
		};
	};
};

export default CombatActions;