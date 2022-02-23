import React from 'react';
import HitPoints from './hitPoints.js';
import Armour from './armour.js';

class CombatContent extends React.Component {
	enemyHealthDescription = () => { //Describes how the enemy looks based on remaining HP.
		if (this.props.enemy.hitPoints === this.props.enemy.maxHitPoints) {
			return <p>The {this.props.enemy.name} is <span className="green">unharmed.</span></p>
		} else if (this.props.enemy.hitPoints >= (this.props.enemy.maxHitPoints / 3 * 2)) {
			return <p>The {this.props.enemy.name} is <span className="green">slightly injured.</span></p>
		} else if (this.props.enemy.hitPoints >= (this.props.enemy.maxHitPoints / 2)) {
			return <p>The {this.props.enemy.name} is <span className="yellow">somewhat injured.</span></p>
		} else if (this.props.enemy.hitPoints >= (this.props.enemy.maxHitPoints / 3)) {
			return <p>The {this.props.enemy.name} is <span className="yellow">quite injured.</span></p>
		} else if (this.props.enemy.hitPoints > 1) {
			return <p>The {this.props.enemy.name} is <span className="red">badly injured.</span></p>
		} else if (this.props.enemy.hitPoints === 1) {
			return <p>The {this.props.enemy.name} <span className="red">looks as if a gentle breeze would topple them.</span></p>
		} else if (this.props.enemy.hitPoints <= 0) {
			return <p>The {this.props.enemy.name} is <span className="red">defeated!</span></p>
		};
	};
	
	turnDescription = () => { //Specifies which turn it is.
		if (this.props.enemy.hitPoints > 0) {
			if (this.props.combatTurn === "player") {
				return <p className="combatTurn">It is your turn.</p>
			} else {
				return <p className="combatTurn">It is the {this.props.enemy.name}'s turn.</p>
			};
		}	
	};
	
	actionDescription = () => { //Describes your action taken and enemy action taken.
		const enemyAction = this.props.enemyAction;
		const weapon = this.props.equippedItems.weapon;
		let actionPrint = [];
		if (this.props.combatTurn === "player") { //Enemy action
			actionPrint = enemyAction.map(element => element.description);
			if (this.props.enemyDamage.length !== 0) {
				actionPrint = actionPrint.map((element, index)=> <div key={index}><p>{element}</p><p>You receive <span className="enemyDamageNumber">{this.props.enemyDamage[index] < 0 ? 0 : this.props.enemyDamage[index]}</span> damage.</p></div>);	
			};
			return actionPrint
		} else { //Player action
			if (this.props.playerDamage > 0) {
				if (weapon.id !== 3) {
				return <p>You hit the {this.props.enemy.name} for <span className="damageNumber">{this.props.playerDamage}<span className="damageNumberInfo">Rolled {this.props.playerDamageBreakdown[0]} out of {Number(weapon.damage.substring(0, weapon.damage.indexOf('d')) * weapon.damage.substring(weapon.damage.length, weapon.damage.indexOf('d')+1))}<br />+ {this.props.playerDamageBreakdown[1]} from your {weapon.stat}{weapon.bonus > 0 ? <span><br />+ {weapon.bonus} from your weapon</span> : null}.</span></span> damage with your {weapon.name}.</p>
				} else {
					const magicBonus = () => {
						let equipment = this.props.equippedItems;
						let equipmentBonus = [];
						let totalBonus;
						for (let x in equipment) {
							if (equipment[x].hasOwnProperty("magicBonus")) {
								equipmentBonus.push(equipment[x].magicBonus);
								totalBonus = equipmentBonus.reduce((a, b) => a + b);
							};
						};
						return totalBonus;
					};
					return <p>You hit the {this.props.enemy.name} for <span className="damageNumber">{this.props.playerDamage}<span className="damageNumberInfo">Rolled {this.props.playerDamageBreakdown[0]} out of {Number(this.props.combatPreviousSpell.damage.substring(0, this.props.combatPreviousSpell.damage.indexOf('d')) * this.props.combatPreviousSpell.damage.substring(this.props.combatPreviousSpell.damage.length, this.props.combatPreviousSpell.damage.indexOf('d')+1))}<br />+ {this.props.playerDamageBreakdown[1]} from your intelligence{magicBonus() > 0 ? <span><br />+ {magicBonus()} from your equipment</span> : null}.</span></span> damage with your {this.props.combatPreviousSpell.name}.</p>
				};
			} else if (this.props.playerHealing > 0) {
				return <p>You restore  <span className="green">{this.props.playerHealing}</span> Hit Points.</p>
			} else if (this.props.combatPreviousSpell.id === 5) {
				return <p>You cast the Shield spell on yourself, increasing your Armour Rating by <span className="green">3</span>.</p>
			};
		};
	};
	render() {
		return <div className="content">
			<p className="combatHeader">You are fighting a {this.props.enemy.name}.</p>
			<div className="combatPlayerHitPoints"><HitPoints {...this.props}/></div>
			<div className="combatPlayerArmour"><Armour {...this.props}/></div>
			<div className="enemyHealthDescription">{this.enemyHealthDescription()}</div>
			{this.actionDescription()}
			{this.props.enemy.hitPoints <= 0 &&
				<div className="combatVictoryDescription">
					<p>Your enemy falls before you.</p>
					<p>You are victorious!</p>
				</div>
			}
			{this.turnDescription()}
		</div>
	};
};

export default CombatContent;