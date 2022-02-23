import React from 'react';
import CombatContent from './combatContent.js';
import CombatActions from './combatActions.js';

class Combat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			combatTurn: "player",
			playerDamage: 0,
			playerHealing: 0,
			playerDamageBreakdown: [],
			combatPreviousSpell: "",
			enemyAction: [],
			enemyDamage: [],
			enemyHealing: []
		};
	};
	
	turnOrder = () => { //Handles the turn order.
		if (this.state.combatTurn === "player") {
			this.setState({
				combatTurn: "enemy"
			});
		} else {
			this.props.spellCooldownUpdate();
			this.props.spellDurationUpdate();
			if (this.props.spellDuration.shield === 0) {
				this.props.armourBonusUpdate(0);
			};
			this.props.combatLock(false);
			this.setState({
				playerDamage: 0,
				playerHealing: 0,
				combatTurn: "player"
			});
		};
	};
	
	damageDisplay = (damage) => { //Track damage dealt by player to enemy.
		this.setState({
			playerDamage: damage
		});
	};
	
	healingDisplay = (healing) => { //Track healing to the player. 
		this.setState({
			playerHealing: healing
		})
	}
	
	damageBreakdown = (roll, statBonus, itemBonus) => { //Records damage breakdown to show to player.
		this.setState({
			playerDamageBreakdown: [roll, statBonus, itemBonus]
		});
	};
	
	enemyAction = (action, damage = 0, healing = 0) => { //Track enemy action taken and damage/healing.
		this.setState({
			enemyAction: action,
			enemyDamage: damage,
			enemyHealing: healing
		});
	};
	
	combatPreviousSpellHandler = (spell) => { //Tracks the previously cast spell.
		this.setState({
			combatPreviousSpell: spell
		});
	};
	
	render = () => {
		return <div id="combatDiv">
			<div className="text">
				<CombatContent {...this.state}
							   {...this.props} />
			</div>
			<div id="actionContainer">
				<CombatActions {...this.state}
							   {...this.props}
							   turnOrder={this.turnOrder}
							   damageDisplay={this.damageDisplay}
							   enemyActionUpdate={this.enemyAction}
							   damageBreakdown={this.damageBreakdown}
							   previousSpellHandler={this.combatPreviousSpellHandler}
							   healingDisplay={this.healingDisplay} />
			</div>
		</div>
		
	};
};

export default Combat;