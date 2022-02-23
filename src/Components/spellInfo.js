import React from 'react';
import RollD4 from './Dice/d4.js';
import RollD6 from './Dice/d6.js';
import RollD8 from './Dice/d8.js';
import RollD10 from './Dice/d10.js';
import RollD12 from './Dice/d12.js';
import RollD20 from './Dice/d20.js';

function SpellInfo(props) {
	const dismiss = () => props.dismiss();
	const focus = () => props.focus();
	const spell = props.showSpellInfo;
	const statBonus = Math.floor(props.stats.stat.intelligence / 4);
	
	const bonus = () => { //Calculates the damage or healing bonus to spells.
		let equipment = props.equippedItems;
		let equipmentBonus = [];
		let intBonus = Math.floor(props.stats.stat.intelligence / 4);
		let totalBonus;
		for (let x in equipment) {
			if (equipment[x].hasOwnProperty("magicBonus")) {
				equipmentBonus.push(equipment[x].magicBonus);
				totalBonus = equipmentBonus.reduce((a, b) => a + b);
			};
		};
		if (totalBonus === undefined) {
			totalBonus = 0;
		};
		return intBonus += totalBonus;
	};
	
	const spellCast = () => {
		const location = window.$inventoryValueSnapshot;
		if (props.value !== "combat") { //Non-combat
			switch(spell.id) {
				case 1: //Firebolt
					switch(location) {
						default:
							props.mainHandler("emptySpell", 1);
							break;
						case 8:
							props.mainHandler("8fire", 1);
							break;
						case 11:
							props.mainHandler("11fire", 1);
							break;
					};
					props.previousSpellUpdate(spell);
					break;
				case 2: //Unlock
					switch(location) {
						default:
							props.mainHandler("emptySpell", 1);
							break;
						case 9:
							props.mainHandler("9unlock", 1);
							break;
					};
					props.previousSpellUpdate(spell);
					break;
				case 3: //Light
					switch(location) {
						default:
							props.mainHandler("emptySpell", 1);
							break;
						case 11:
							props.mainHandler("11light", 1);
							break;
					};
					props.previousSpellUpdate(spell);
					break;
				case 4: //Heal
					switch(location) {
						default:
							if (props.hitPoints < props.maxHitPoints) {
								if (props.spellCooldown.heal === 0) {
								let healing = 0;
								for(let n = 0; n < 2; n++) {
									healing += RollD4();
								};
								healing += bonus();
								props.hitPointsUpdate(healing);
								props.spellCooldownSet(4);
								};
								break;
							};
							break;
					};
					props.previousSpellUpdate(spell);
					break;
				case 5: //Shield
					switch(location) {
						default:
							props.mainHandler("emptySpell", 1);
							break;
					};
					props.previousSpellUpdate(spell);
					break;
				case 6: //Levitate
					switch(location) {
						default:
							props.mainHandler("emptySpell", 1);
							break;
						case 10:
							props.mainHandler("10levitate", 1);
							break;
					};
					props.previousSpellUpdate(spell);
					break;
				case 7: //Lightning Bolt
					switch(location) {
						default:
							props.mainHandler("emptySpell", 1);
							break;
					};
					props.previousSpellUpdate(spell);
					break;
				case 8: //Fireball
					switch(location) {
						default:
							props.mainHandler("emptySpell", 1);
							break;
						case 8:
							props.mainHandler("8fire", 1);
							props.spellCooldownSet(8);
							break;
						case 11:
							props.mainHandler("11fire", 1);
							props.spellCooldownSet(8);
							break;
					};
					props.previousSpellUpdate(spell);
					break;
				case 9: //Rejuvenate
					switch(location) {
						default:
							if (props.hitPoints < props.maxHitPoints) {
								if (props.spellCooldown.rejuvenate === 0) {
								let healing = 0;
								for(let n = 0; n < 4; n++) {
									healing += RollD4();
								};
								healing += bonus();
								props.hitPointsUpdate(healing);
								props.spellCooldownSet(9);
								};
								break;
							};
							break;
					};
					props.previousSpellUpdate(spell);
					break;
				case 10: //Blade Storm
					switch(location) {
						default:
							props.mainHandler("emptySpell", 1);
							break;
					};
					props.previousSpellUpdate(spell);
					break;
				default:
					console.log("No Spell ID found");
					break;
				};
		} else { //Combat
			if (props.showSpellInfo.damage) {
				function spellAttack() { //Calculates damage from player spell attacks.
					const damage = (roll, multiplier) => {
						let result = 0;
						switch(roll) {
							default:
								break;
							case "d4":
								for(let n = 0; n < multiplier; n++) {
									result += RollD4();
								};
								return result + bonus();
							case "d6":
								for(let n = 0; n < multiplier; n++) {
									result += RollD6();
								};
								return result + bonus();
							case "d8":
								for(let n = 0; n < multiplier; n++) {
									result += RollD8();
								};
								return result + bonus();
							case "d10":
								for(let n = 0; n < multiplier; n++) {
									result += RollD10();
								};
								return result + bonus();
							case "d12":
								for(let n = 0; n < multiplier; n++) {
									result += RollD12();
								};
								return result + bonus();
							case "d20":
								for(let n = 0; n < multiplier; n++) {
									result += RollD20();
								};
								return result + bonus();
						};
					};
					const spellDamage = damage(spell.damage.substring(spell.damage.length, spell.damage.indexOf('d')), spell.damage.substring(0, spell.damage.indexOf('d')));
					props.enemyHitPointsUpdate(spellDamage);
					if (spell.hasOwnProperty("cooldown")) {
						props.spellCooldownSet(spell.id);
					};
					props.damageDisplay(spellDamage);
					props.damageBreakdown((spellDamage - bonus()), statBonus, bonus() - statBonus);
					props.turnOrder();
				};
				spellAttack();
				props.previousSpellHandler(spell);
				props.combatSpellHandler(false);
			} else if (props.showSpellInfo.healing) { //Calculates healing from healing spells.
				if (props.spellCooldown[spell.name.toLowerCase()] === 0) {
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
									return result + bonus();
								case "d6":
									for(let n = 0; n < multiplier; n++) {
										result += RollD6();
									};
									return result + bonus();
								case "d8":
									for(let n = 0; n < multiplier; n++) {
										result += RollD8();
									};
									return result + bonus();
								case "d10":
									for(let n = 0; n < multiplier; n++) {
										result += RollD10();
									};
									return result + bonus();
								case "d12":
									for(let n = 0; n < multiplier; n++) {
										result += RollD12();;
									};
									return result + bonus();
								case "d20":
									for(let n = 0; n < multiplier; n++) {
										result += RollD20();;
									};
									return result + bonus();
							};
						};
						const heal = healing(spell.healing.substring(spell.healing.length, spell.healing.indexOf('d')), spell.healing.substring(0, spell.healing.indexOf('d')));
						props.hitPointsUpdate(heal);
						props.spellCooldownSet(spell.id);
						props.healingDisplay(heal);
						props.turnOrder();
						props.previousSpellHandler(spell);
						props.combatSpellHandler(false);
					};
				};
			} else if (props.showSpellInfo.id === 5) { //Shield
				props.armourBonusUpdate(3);
				props.spellDurationSet(5);
				props.turnOrder();
				props.previousSpellHandler(spell);
				props.combatSpellHandler(false);
			};
		};
	};
	
	React.useEffect(() => {
		document.getElementsByClassName("spellInfo")[0].focus();
	});
	return <span className="spellInfo" tabIndex="0" onBlur={() => {dismiss()}}>
		<h3>{props.showSpellInfo.name}</h3>
		<p>{props.showSpellInfo.description}</p>
		{props.showSpellInfo.damage ?
			props.stats.stat.intelligence >= props.showSpellInfo.level ?
				props.showSpellInfo.hasOwnProperty("cooldown") ?
					props.spellCooldown[spell.name.toLowerCase()] === 0 ?
						<p className="bold">Damage: {props.showSpellInfo.damage.substring(0, props.showSpellInfo.damage.indexOf('d'))}-{Number(props.showSpellInfo.damage.substring(0, props.showSpellInfo.damage.indexOf('d')) * props.showSpellInfo.damage.substring(props.showSpellInfo.damage.length, props.showSpellInfo.damage.indexOf('d')+1))} + {bonus()}</p>
					: <p className="bold">Cooldown: {props.spellCooldown[spell.name.toLowerCase()]}</p>
				: <p className="bold">Damage: {props.showSpellInfo.damage.substring(0, props.showSpellInfo.damage.indexOf('d'))}-{Number(props.showSpellInfo.damage.substring(0, props.showSpellInfo.damage.indexOf('d')) * props.showSpellInfo.damage.substring(props.showSpellInfo.damage.length, props.showSpellInfo.damage.indexOf('d')+1))} + {bonus()}</p>
			: <p className="bold">Intelligence required: {props.showSpellInfo.level}</p>
		: null}
		{props.showSpellInfo.healing ? 
			props.stats.stat.intelligence >= props.showSpellInfo.level ?
				props.spellCooldown[spell.name.toLowerCase()] === 0 ?
					<p className="bold">Heals: {props.showSpellInfo.healing.substring(0, props.showSpellInfo.healing.indexOf('d'))}-{Number(props.showSpellInfo.healing.substring(0, props.showSpellInfo.healing.indexOf('d')) * props.showSpellInfo.healing.substring(props.showSpellInfo.healing.length, props.showSpellInfo.healing.indexOf('d')+1))} + {bonus()}</p> 
				: <p className="bold">Cooldown: {props.spellCooldown[spell.name.toLowerCase()]}</p>
			: <p className="bold">Intelligence required: {props.showSpellInfo.level}</p>
		: null}
		{props.stats.stat.intelligence >= props.showSpellInfo.level ?
			props.spellCooldown[spell.name.toLowerCase()] > 0 ?
				<input type="button" className="spellCastButton locked" value="Cast" onFocus={() => {focus()}}></input>
			: <input type="button" className="spellCastButton" value="Cast" onFocus={() => {focus()}} onClick={() => {spellCast()}}></input>
		: <input type="button" className="spellCastButton locked" value="Cast" onFocus={() => {focus()}}></input>}
	</span>
}
export default SpellInfo;