import React from 'react';
import Text from './text.js';
import Actions from './actions.js';
import Items from './items.js';
import ItemList from './itemList.js';
import Spells from'./spells.js';
import SpellList from './spellList.js';
import Combat from './combat.js';
import CombatEnemies from './combatEnemies.js';
import Gameover from './gameover.js';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.shuffle = this.shuffle.bind(this);
		this.state = {
			gameover: false,
			stats: {stat: {strength: 0, dexterity: 0, intelligence: 0, vitality: 0}},
			allocate: {allocate: true, points: 20},//This controls whether or not points can be allocated to statistics at the current time and how many points are available.
			actionCases: {	case5: [true, true, true, true],
							case8: [true, true, true, true],
							case12: [true]},
			inventoryContents: [],
			equippedItems: {head: "", torso: "", legs: "", boots: "", gloves: "", weapon: ""},
			spellbook: [],
			hitPoints: 10,
			maxHitPoints: 10,
			healing: 0,
			enemy: "",
			weaponSwap: false,
			combatSpell: false,
			combatItem: false,
			armour: 0,
			armourBonus: 0,
			latestSpell: {}, //Tracks the most recent spell added to the spellbook.
			previousSpell: "", //Tracks the most recent spell cast outside of combat (tracking inside combat is done in Combat component).
			receivedItems: [],
			weaponSwapLock: false, //These 2 lock states have to be here instead of the combat component because weapon swapping in combat is handled in this component.
			itemUseLock: false,
			allSpellsUnlocked: false, //Sets to true once all possible spells have been added to the spellbook.
			inputRequired: false //Toggles an input field in the Action component for user inputted answer.
		};
	};
	
	componentDidMount = () => this.statisticHandler(0, 0, 0, 0); ///Sets all stats to 0 at game start.
	
	allocateHandler = (allocate, points) => { //For handling stat point allocation for stat improvements.
		this.setState ({
			allocate: {
				allocate: allocate,
				points: points
			}
		});
	};
	
	hitPointsHandler = (HP) => { //Used to add or remove current hit points.
		let oldHitPoints = this.state.hitPoints;
		let newHitPoints = oldHitPoints + HP;
		let finalHitPoints;
		if (newHitPoints < 0) {
			finalHitPoints = 0;
		} else if (newHitPoints > this.state.maxHitPoints) {
			finalHitPoints = this.state.maxHitPoints;
		} else {
			finalHitPoints = newHitPoints;
		}
		this.setState({
			hitPoints: finalHitPoints
		});
		if (HP > 0) {
			this.setState({
				healing: HP
			});
		};
	};
	
	hitPointsMaxHandler = (hitPointsAdd) => { //Used to update user's maximum hit points by means other than increasing vitality. Pass negative values to remove hit points.
		let hitPointsMaxUpdate = this.state.maxHitPoints + hitPointsAdd;
		let hitPointsUpdate = this.state.hitPoints + hitPointsAdd;
		this.setState ({
			maxHitPoints: hitPointsMaxUpdate,
			hitPoints: hitPointsUpdate
		});
	};
	
	healingHandler = () => { //Used to reset healing state to 0;
		this.setState({
			healing: 0
		})
	}
	
	armourHandler = () => { //Calculates and updates the player's armour value.
		let wornItems = this.state.equippedItems;
		let armour = [];
		let totalArmour;
		let armourBonus = this.state.armourBonus;
		for (let x in wornItems) {
			if (wornItems[x].hasOwnProperty("armour")) {
				armour.push(wornItems[x].armour);
				totalArmour = armour.reduce((a, b) => a + b);
			};
		};
		if (totalArmour === undefined) {
			totalArmour = 0;
		};
		totalArmour = (totalArmour + armourBonus);
		this.setState({
			armour: totalArmour
		});
	};
	
	armourBonusHandler = (bonus) => { //Handles bonuses to the armour stat (e.g. from the Shield spell).
		this.setState({
			armourBonus: bonus
		}, () => {
			this.armourHandler();
		});
	};
	
	statisticHandler = (str, dex, int, vit) => { //Used to update statistics from child components.
		let strength = this.state.stats.stat.strength + str;
		let dexterity = this.state.stats.stat.dexterity + dex;
		let intelligence = this.state.stats.stat.intelligence + int;
		let vitality = this.state.stats.stat.vitality + vit;
		let maxHP = this.state.maxHitPoints - this.state.stats.stat.vitality;
		let currentHP = this.state.hitPoints - this.state.stats.stat.vitality;
		this.setState ({
			stats: {
				stat: {
					strength: strength,
					dexterity: dexterity,
					intelligence: intelligence,
					vitality: vitality
				}
			},
			maxHitPoints: maxHP + vitality,
			hitPoints: currentHP + vitality
		});
	};
	
	actionLock = (c, i) => { //Disables actions that do not lead onto a new scene after they've been taken.
		let state = JSON.parse(JSON.stringify(this.state.actionCases));
		let stateName = "case" + c;
		let index = state[stateName][i];
		index = false;
		state[stateName][i] = index;
		let actionCases = state;
		this.setState({
			actionCases
		});
	};
	
	inventorySort = (a, b) => { //Sort items in the inventory and spellbook alphabetically.
		let nameA = a.name.toUpperCase();
		let nameB = b.name.toUpperCase();
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	};
	
	inventoryUpdate = (...item) => { //Add items to inventory contents (Add multiple items at once by passing more arguments).
		let oldInventory = this.state.inventoryContents.slice();
		let eachItem = [];
		const items = ItemList;
		function checkItems(i) {
			eachItem.push(items.find((items) => items.id === i));
		};
		item.forEach((item) => {
			checkItems(item);
		});
		let newInventory = oldInventory.concat([eachItem]);
		let flatInventory = newInventory.flat();
		flatInventory.sort(this.inventorySort);
		this.setState(() => {
			return {inventoryContents: flatInventory};
		});
	};
	
	inventoryRemove = (...item) => { //Remove items from inventory contents.
		let inventory = this.state.inventoryContents.slice();
		item.forEach((i) => {
			let removeItem = inventory.findIndex((element) => element.id === i);
			inventory.splice(removeItem, 1);
		});
		this.setState({inventoryContents: inventory});
	};
	
	spellUpdate = (...spells) => { //Add a spell to the spellbook.
		let oldSpells = this.state.spellbook.slice();
		let addedSpells = [];
		function checkSpells(s) {
			addedSpells.push(SpellList.find((spellList) => spellList.id === s));
		};
		spells.forEach((spells) => {
			checkSpells(spells);
		});
		let newSpells = oldSpells.concat([addedSpells]);
		let flatSpellbook = newSpells.flat();
		flatSpellbook.sort(this.inventorySort);
		this.setState({spellbook: flatSpellbook});
	}
	
	equipUpdate = (item) => { //Equip items when selected in the inventory.
		let equipState = {...this.state.equippedItems};
		let inventoryState = this.state.inventoryContents;
		let inventoryUpdate = inventoryState.filter(element => element !== item);
		const combatCheck = () => {
			if (this.props.value === "combat") {
				return "combat";
			} else {
				return "inventory";
			}
		};
		switch(item.equipSlot) {
			default:
				break
			case "head":
				equipState.head = item;
				if(this.state.equippedItems.head !== "") {
					inventoryUpdate.push(this.state.equippedItems.head);
				}
				this.props.mainHandler("inventory", inventoryUpdate.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryUpdate.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				break;
				
			case "torso":
				equipState.torso = item;
				if(this.state.equippedItems.torso !== "") {
					inventoryUpdate.push(this.state.equippedItems.torso);
				}
				this.props.mainHandler("inventory", inventoryUpdate.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryUpdate.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				break;
				
			case "legs":
				equipState.legs = item;
				if(this.state.equippedItems.legs !== "") {
					inventoryUpdate.push(this.state.equippedItems.legs);
				}
				this.props.mainHandler("inventory", inventoryUpdate.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryUpdate.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				break;
				
			case "boots":
				equipState.boots = item;
				if(this.state.equippedItems.boots !== "") {
					inventoryUpdate.push(this.state.equippedItems.boots);
				}
				this.props.mainHandler("inventory", inventoryUpdate.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryUpdate.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				break;
				
			case "gloves":
				equipState.gloves = item;
				if(this.state.equippedItems.gloves !== "") {
					inventoryUpdate.push(this.state.equippedItems.gloves);
				}
				this.props.mainHandler("inventory", inventoryUpdate.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryUpdate.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				break;
				
			case "weapon":
				equipState.weapon = item;
				if(this.state.equippedItems.weapon !== "") {
					inventoryUpdate.push(this.state.equippedItems.weapon);
				}
				this.props.mainHandler(combatCheck(), inventoryUpdate.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryUpdate.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				if (this.props.value === "combat") {
					this.setState ({
						weaponSwap: false
					});
					this.combatLock(true);
				};
		};
	};
	
	unequipUpdate = (slot) => { //Unequip items when selected in the equipment area.
		let equipState = {...this.state.equippedItems};
		let inventoryState = this.state.inventoryContents;
		switch(slot.equipSlot) {
			default:
				break
			case "head":
				equipState.head = "";
				inventoryState.push(slot);
				this.props.mainHandler("inventory", inventoryState.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryState.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				break;
			case "torso":
				equipState.torso = "";
				inventoryState.push(slot);
				this.props.mainHandler("inventory", inventoryState.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryState.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				break;
			case "legs":
				equipState.legs = "";
				inventoryState.push(slot);
				this.props.mainHandler("inventory", inventoryState.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryState.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				break;
			case "boots":
				equipState.boots = "";
				inventoryState.push(slot);
				this.props.mainHandler("inventory", inventoryState.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryState.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				break;
			case "gloves":
				equipState.gloves = "";
				inventoryState.push(slot);
				this.props.mainHandler("inventory", inventoryState.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryState.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				})
				break;
			case "weapon":
				equipState.weapon = "";
				inventoryState.push(slot);
				this.props.mainHandler("inventory", inventoryState.length);
				this.setState ({
					equippedItems: equipState,
					inventoryContents: inventoryState.sort(this.inventorySort)
				}, () => {
					this.armourHandler();
				});
		};
		this.armourHandler();
	};
	
	enemyNumber = (id) => { //Receives an enemy ID from Actions to pass to Combat.
		this.setState ({
			enemy: CombatEnemies.find(enemy => enemy.id === id)
		});
	};
	
	enemyHitPointHandler = (damage) => { //Updates enemy hit points during combat.
		let enemyHitPointsOld = this.state.enemy.hitPoints;
		this.setState(prevState => ({
			enemy: {
				...prevState.enemy,
				hitPoints: enemyHitPointsOld - damage
			}
		}));
	};
	
	combatWeaponSwapHandler = (bool) => { //Toggles the changing of weapons during combat.
		this.setState ({
			weaponSwap: bool
		});
	};
	
	combatSpellHandler = (bool) => { //Toggles whether spells are being used in combat.
		this.setState ({
			combatSpell: bool
		});
	};
	
	combatItemHandler = (bool) => { //Toggles using items in combat.
		this.setState ({
			combatItem: bool
		});
	};
	
	shuffle = (array) => { //Shuffles arrays.
		let currentIndex = array.length, randomIndex;
			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;
				[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
			};
		return array;
	};

	
	spellPicker = () => { //Chooses a random spell that the player does not know and adds it to the spellbook.
		window.$spellPickerValueSnapshot = this.props.value;
		window.$spellPickerActionSnapshot = this.props.actionNum;
		let spellbook = this.state.spellbook.slice();
		let spells = SpellList.filter(x => !spellbook.includes(x));
		spells.filter(x => !x.id === 11);
		const shuffledSpells = this.shuffle(spells);
		this.spellUpdate(shuffledSpells[0].id);
		this.setState({
			latestSpell: shuffledSpells[0]
		});
	};
	
	itemPicker = (mod, amount) => { //Chooses a random item that the player does not have (or can have multiple of) and adds it to the inventory.
		let inventory = this.state.inventoryContents.slice();
		let equipped = this.state.equippedItems;
		let finalTreasure = [];
		for (let x in equipped) {
			if (equipped[x].hasOwnProperty("id")) {
				inventory.push(equipped[x]);
			};
		};
		let items = ItemList.filter(x => x.hasOwnProperty("treasure"));
		let treasure = items.filter(x => x.treasure !== 1);
		treasure = treasure.filter(x => !inventory.includes(x));
		let add = items.filter(x => x.treasure === 1);
		for (let x = 0; x < add.length; x++) {
			treasure.push(add[x]);
		};
		treasure.filter(x => x.treasure <= mod);
		function treasureShuffle(array) { //Can't just use the shuffle function in here cause of scope something or other blah blah blah.
			let currentIndex = array.length, randomIndex;
				while (currentIndex !== 0) {
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex--;
					[array[currentIndex], array[randomIndex]] = [
					array[randomIndex], array[currentIndex]];
				};
			return array;
		};
		for (let i = 0; i < amount; i++) {
			let shuffledTreasure = treasureShuffle(treasure.slice());
			if (shuffledTreasure[0].treasure !== 1) {
				treasure.splice(treasure.findIndex(item => item.id === shuffledTreasure[0].id), 1);
				finalTreasure.push(shuffledTreasure.shift().id);
			} else {
				finalTreasure.push(shuffledTreasure.shift().id);
			};
		};
		this.inventoryUpdate(...finalTreasure);
		for (let i = 0; i <= finalTreasure.length; i++) {
			if (finalTreasure[i] === 3) {
				this.spellPicker();
			};
		};
		let finalName = [];
		for (let i = 0; i < finalTreasure.length; i++) {
			finalName.push(ItemList.find((items) => items.id === finalTreasure[i]));
		};
		this.setState({
			receivedItems: finalName
		})
	};
	
	previousSpellHandler = (spell) => { //Tracks the previously cast spell outside combat.
		this.setState({
			previousSpell: spell
		});
	};
	
	combatLock = (bool) => { //Locks the weapon swap and use item options after one of them is used until next turn.
		this.setState({
			weaponSwapLock: bool,
			itemUseLock: bool
		});
	};
	
	requireInput = (bool) => { //Toggles the inputRequired state.
		this.setState({
			inputRequired: bool
		});
	};
	
	gameover = () => { //For setting gameover in combat.
		this.setState ({
			gameover: true
		});
	};
	
	actionRender = () => { //For displaying the correct Action component/s.
		switch(this.props.value) {
			case "inventory":
				return <div id="actionContainer">
					<Items	{...this.state}
							{...this.props}
							itemEquipHandler={this.equipUpdate}
							hitPointsUpdate={this.hitPointsHandler}
							inventoryRemove={this.inventoryRemove}
							spellPickerHandler={this.spellPicker} />
							
					<Spells {...this.state}
							{...this.props}
							hitPointsUpdate={this.hitPointsHandler}
							healingUpdate={this.healingHandler}
							previousSpellUpdate={this.previousSpellHandler} />
				</div>
			default:
				return <div id="actionContainer">
					<Actions {...this.state}
							 {...this.props}
							 statsHandler={this.statisticHandler}
							 allocateHandler={this.allocateHandler}
							 inventoryHandler={this.inventoryUpdate}
							 itemEquipHandler={this.equipUpdate}
							 spellbookUpdate={this.spellUpdate}
							 hitPointsUpdate={this.hitPointsHandler}
							 hitPointsMaxHandler={this.hitPointsMaxHandler}
							 enemyNumberUpdate={this.enemyNumber}
							 inventoryRemove={this.inventoryRemove}
							 lock={this.actionLock}
							 spellPickerHandler={this.spellPicker}
							 itemPickerHandler={this.itemPicker}
							 requireInput={this.requireInput}
							 gameover={this.gameover} />
				</div>
		};
	};
	
	render() {
		if (this.props.value !== "combat") {
			if (this.state.hitPoints <= 0 || this.state.gameover === true) {
				return <div id="game">
					<Gameover />
				</div>
			} else {
				return <div id="game">
					<Text {...this.state}
						  {...this.props}
						  statsHandler={this.statisticHandler}
						  allocateHandler={this.allocateHandler}
						  inventoryHandler={this.inventoryUpdate}
						  itemEquipHandler={this.equipUpdate}
						  itemUnequipHandler={this.unequipUpdate}
						  spellbookUpdate={this.spellUpdate}
						  inventoryRemove={this.inventoryRemove}
						  gameover={this.gameover}
						  healingUpdate={this.healingHandler} />
					{this.actionRender()}
				</div>
			}
		} else {
			if (this.state.gameover === true) {
				return <div id="game">
					<Gameover />
				</div>
			} else {
				return <div id="game">
					<Combat {...this.state}
						    {...this.props}
						    statsHandler={this.statisticHandler}
						    allocateHandler={this.allocateHandler}
						    inventoryHandler={this.inventoryUpdate}
						    itemEquipHandler={this.equipUpdate}
						    spellbookUpdate={this.spellUpdate}
						    hitPointsUpdate={this.hitPointsHandler}
							enemyHitPointsUpdate={this.enemyHitPointHandler}
							weaponSwapHandler={this.combatWeaponSwapHandler}
							combatSpellHandler={this.combatSpellHandler}
							combatItemHandler={this.combatItemHandler}
							inventoryRemove={this.inventoryRemove}
							armourBonusUpdate={this.armourBonusHandler}
							gameover={this.gameover}
							healingUpdate={this.healingHandler}
							combatLock={this.combatLock} />
				</div>
			}
		}
	}
}

export default Game;