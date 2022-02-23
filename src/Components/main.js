import React from 'react';
import Start from './start.js';
import Game from './game.js';
import SpellList from './spellList.js';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gameActive: false,
			value: "",
			actionNum: 0,
			chambers: [],
			spellCooldown: {
				"heal": 0,
				"rejuvenate": 0,
				"lightning bolt": 0,
				"fireball": 0,
				"blade storm": 0
			},
			spellDuration: {
				"shield": 0
			}
		};
	};
	
	actionHandler = (value, actionNum) => { //Sets the value and number of actions for each scene.
		this.setState ({
			value: value,
			actionNum: actionNum,
		});
	};
	
	gameStart = () => { //Starts the game and sets starting values.
		this.actionHandler(0);
		this.chamberSelect();
		this.setState({gameActive: true, actionNum: 3});
	};
	
	key = (e) => {if (e.keyCode === 32) { //Checks if the space bar was pressed for accessibility.
		this.gameStart();
	}};
	
	chamberSelect = () => { //Selects and randomly orders values to act as randomly generated chambers to enter. 
		const allChambers = [8, 9, 10, 11, 12]; //Array of all potential randomly generated chambers.
		const shuffledChambers = allChambers.sort(function (a,b) {
			return 0.5 - Math.random()
		});
		this.setState({
			chambers: shuffledChambers.splice(0, 6)
		});
	};
	
	chamberUpdate = (c) => { //Updates the chambers state and removes visited chamber.
		let newChambers = this.state.chambers.slice().filter(num => num !== c);
		this.setState({
			chambers: newChambers
		});
	};
	
	spellCooldownHandler = () => { //Updates the cooldown of spells.
		let state = JSON.parse(JSON.stringify(this.state.spellCooldown));
		for (let spell in state) {
			if (state[spell] > 0) {
				state[spell] = state[spell] - 1;
			};
		};
		let spellCooldown = state;
		this.setState({
			spellCooldown
		});
	};
	
	spellCooldownSet = (spell) => { //Sets the cooldown of spells.
		let activeSpell = SpellList.find((element) => element.id === spell);
		let state = JSON.parse(JSON.stringify(this.state.spellCooldown));
		state[activeSpell.name.toLowerCase()] = activeSpell.cooldown;
		let spellCooldown = state;
		this.setState({
			spellCooldown
		});
	};
	
	spellDurationHandler = () => { //Updates the duration of spells.
		let state = JSON.parse(JSON.stringify(this.state.spellDuration));
		for (let spell in state) {
			if (state[spell] > 0) {
				state[spell] = state[spell] - 1;
			};
		};
		let spellDuration = state;
		this.setState({
			spellDuration
		});
	};
	
	spellDurationSet = (spell) => { //Sets the duration of spells.
		let activeSpell = SpellList.find((element) => element.id === spell);
		let state = JSON.parse(JSON.stringify(this.state.spellDuration));
		state[activeSpell.name.toLowerCase()] = activeSpell.duration;
		let spellDuration = state;
		this.setState({
			spellDuration
		});
	};
	
	spellDurationClear = (spell) => { //Clears the duration of specified active spells. For use at the end of combat (or if I decide to put in some kind of magic dispelling effect. Devilish!)
		let activeSpell = SpellList.find((element) => element.id === spell);
		let state = JSON.parse(JSON.stringify(this.state.spellDuration));
		state[activeSpell.name.toLowerCase()] = 0;
		let spellDuration = state;
		this.setState({
			spellDuration
		});
	};
	
	render() {
		if (this.state.gameActive) {
			return <div><Game {...this.state}
							  mainHandler={this.actionHandler}
							  chamberHandler={this.chamberUpdate}
							  spellCooldownUpdate={this.spellCooldownHandler}
							  spellCooldownSet={this.spellCooldownSet}
							  spellDurationUpdate={this.spellDurationHandler}
							  spellDurationSet={this.spellDurationSet}
							  spellDurationClear={this.spellDurationClear} /></div>
		} else {
			return <div onClick={this.gameStart} onKeyDown={this.key} tabIndex="0"><Start /></div>
		};
	};
}

export default Main;