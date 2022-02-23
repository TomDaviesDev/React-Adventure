import React from 'react';
import SpellInfo from './spellInfo.js';

let spellNames;
let buttonPos;
let combatSpells;
class Spells extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showSpellInfo: false};
		this.timeOutId = null;
	}
	
	componentDidMount(key) { //Add the names of spells to each rendered spell button.
		const spellPrint = () => {
			if (this.props.value !== "combat") {
				let spellbookContents = this.props.spellbook.slice();
				spellNames = spellbookContents.map(spell => spell.name);
			} else {
				let spellbookContents = combatSpells.slice();
				spellNames = spellbookContents.map(spell => spell.name);
			}
		};
		spellPrint();
		switch(key) {
			default:
				return "Alas, it appears that you have misplaced one of your spells."
			case key:
				return spellNames[key];
		};
	};
	
	componentDidUpdate() { //Position the spellInfo component based on the button position from spellClick.
		if (this.state.showSpellInfo) {
			const infoPosition = () => {
				document.getElementsByClassName("spellInfo")[0].style.left = (buttonPos.left + buttonPos.width + 20) + "px";
				document.getElementsByClassName("spellInfo")[0].style.top = (buttonPos.top - (document.getElementsByClassName("spellInfo")[0].getBoundingClientRect().height / 2.6)) + "px";
			};
			infoPosition();
		};
	};
	
	componentWillUnmount() { //Stop extra stuff happening on the spellInfo when it's already unmounted (optimization!).
		this.setState({showSpellInfo: false});
		clearTimeout(this.timeOutId);
	};
	
	spellSelect = () => { //Render rows of spells based on the value of spellbook prop.
		let spells = [];
		if (this.props.spellbook.length === 0) {
			spells.push(<p key="noSpell">You have no spells in your Spellbook. Keep an eye out for magical scrolls in your journey!</p>);
		} else {
			if (this.props.value !== "combat") {
				for (let x = 0; x < this.props.spellbook.length; x++) {
					spells.push(<div className="spell" data-value={x} key={x} onClick={this.spellClick} onKeyDown={this.keyCheck} tabIndex="0">{this.componentDidMount(x)}
					</div>);
				};
			} else {
				combatSpells = this.props.spellbook.filter(spell => spell.canBeUsedInCombat === true);
				for (let x = 0; x < combatSpells.length; x++) {
					spells.push(<div className="spell" data-value={x} key={x} onClick={this.spellClick} onKeyDown={this.keyCheck} tabIndex="0">{this.componentDidMount(x)}
					</div>);
				};
				spells.push(<div className="action" id="combatCancelSpell" key="cancelSpell" onClick={this.cancelSpell} onKeyDown={this.keyCheckCancel} tabIndex="0">Cancel</div>)
			};
		};
		return spells;
	};
	
	keyCheck = (event) => {if (event.keyCode === 32) { //Confirm if the space bar is pressed for accessibility purposes.
		this.spellClick(event);
	}};
	
	keyCheckCancel = (event) => {if (event.keyCode === 32) {
		this.cancelSpell();
	}};
	
	spellClick = (event) => { //Show the spellInfo component and get the position of the button.
		if (this.state.showSpellInfo === false) {
			if (this.props.value !== "combat") {
				let spell = this.props.spellbook[event.target.dataset.value];
				buttonPos = event.target.getBoundingClientRect();
				this.setState({showSpellInfo: spell});
			} else {
				let spell = combatSpells[event.target.dataset.value];
				buttonPos = event.target.getBoundingClientRect();
				this.setState({showSpellInfo: spell});
			};
		};
	};
	
	handleTooltipDismiss = () => { //Dismiss the spellInfo component.
		this.timeOutId = setTimeout(() => {
			this.setState({showSpellInfo: false});	
		});
	};
	
	handleTooltipFocus = () => { //Cancel the above function when the component is focused.
		clearTimeout(this.timeOutId);
	};
	
	cancelSpell = () => { //Unmounts spell component.
		this.props.combatSpellHandler(false);
	};
	
	render() {
		const spellbookEquipped = this.props.equippedItems.weapon.id === 3;
		return <div id="spellContainer">
			<p className="spellTitle">Spells</p>
			<div className="spellContainerOverflow">
				{spellbookEquipped ? (
					this.spellSelect()
				) : (
					<p id="noSpellbookText">Equip a Spellbook to cast spells.</p>
				)}
			</div>
			{this.state.showSpellInfo ? <SpellInfo {...this.props} {...this.state} dismiss={this.handleTooltipDismiss} focus={this.handleTooltipFocus} key={this.state.showSpellInfo.name} /> : null}
		</div>
	};
};
		
export default Spells