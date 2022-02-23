import React from 'react';
import Items from './itemList.js';
import Chambers from './chambers.js';
import RollD20 from './Dice/d20.js';
import SpellList from './spellList';
import RollD10 from './Dice/d10.js';

let v;
let a;
let c;
class Actions extends React.Component {
	
	componentDidMount(key) {
		switch(this.props.value) {
			default: 
				return "Confound it! This is a broken bit. You shouldn't be able to read this."
			case "emptySpell":
				return "Continue."
			case "spellScrollNoSpellbook":
				return "Continue."
			case "spellScroll":
				return "Continue."
			case "allSpells":
				return "Continue, but more intelligently."
			case 0:
				switch(key) {
					default:
						return "Oh dear, things have gone very wrong here. You shouldn't be seeing this at all!"
					case 0:
						return "Wealth. You have heard that great treasure may be found within Malthazor's hoard. You intend to confirm or deny those rumours for good."
					case 1:
						return "Revenge. Malthazor's cruelty took somebody that you cared about. You mean to avenge yourself upon him."
					case 2:
						return "Curiosity. Malthazor may be mad, but his collection of arcane and esoteric knowledge is said to be second to none."
				}
			case 1:
				return "Continue."
			case 2:
				return "Continue."
			case 3:
				switch(key) {
					default:
						return "Oh dear, things have gone very wrong here. You shouldn't be seeing this at all!"
					case 0:
						return "You have brought your trusty sword to face whatever dangers you may find. Your abilities with the sword are based on your Strength."
					case 1:
						return "You have come equipped with your hunting bow to fell dangers before they can reach you. Your abilities with the bow are based on your Dexterity."
					case 2:
						return "You carry a book of spells to keep you safe from danger, though only a few pages are currently filled in. Your abilities with spells are based on your Intelligence."
				}
			case 4:
				return "Continue."
			case 5:
				switch(key) {
					default:
						return "Oh dear, things have gone very wrong here. You shouldn't be seeing this at all!"
					case 0:
						return "Cross the room and enter the passageway."
					case 1:
						if (this.props.actionCases.case5[1] === true) {
							return "Return through the door behind you. Coming here was a mistake."
						} else {
							return <span className="locked">Return through the door behind you. Coming here was a mistake.</span>
						}
					case 2:
						if (this.props.stats.stat.strength >= 3 && this.props.actionCases.case5[2] === true) {
							return "Take a torch from one of the wall sconces. (Requires 3 Strength)"	
						} else {
							return <span className="locked">Take a torch from one of the wall sconces. (Requires 3 Strength)</span>
						}
					case 3:
						if (this.props.stats.stat.intelligence >= 3 && this.props.actionCases.case5[3] === true) {
							return "Examine the torches around the room. (Requires 3 Intelligence)"
						} else {
							return <span className="locked">Examine the torches around the room. (Requires 3 Intelligence)</span>
						}
				}
				case 5.1:
					return "Continue."
				case 5.2:
					return "Continue."
				case 5.3:
					return "Continue."
			case 6:
				return "Defend yourself!"
				case "6loot":
					if (this.props.inventoryContents.find(item => item.id === 4)) {
						return "Take the helmet and healing potion."
					} else {
						return "Take the helmet."
					}
				case 6.1:
					return "Continue."
			case 7:
				return "Continue into the dungeon."
			case 8:
				switch(key) {
					default:
						return "Oh dear, things have gone very wrong here. You shouldn't be seeing this at all!"
					case 0:
						return "Attempt to find an exit from this room. (50% chance of painless success)"
					case 1:
						if (this.props.actionCases.case8[1] === true) {
							if (this.props.stats.stat.intelligence >= 6) {
								return "Attempt to find an exit from this room. (Requires 6 Intelligence)"
							} else {
								return <span className="locked">Attempt to find an exit from this room. (Requires 6 Intelligence)</span>
							}
						} else {
							return <span className="locked">Attempt to find an exit from this room. (Requires 6 Intelligence)</span>
						}
					case 2:
						if (this.props.actionCases.case8[2] === true) {
							if (this.props.equippedItems.weapon.id === 3 || this.props.inventoryContents.find(item => item.id === 3)) {
								return "Search the books for any spells that might be useful to you. (Requires a Spellbook)"	
							} else {
								return <span className="locked">Search the books for any spells that might be useful to you. (Requires a Spellbook)</span>
							}
						} else {
							return <span className="locked">Search the books for any spells that might be useful to you. (Requires a Spellbook)</span>
						}
					case 3:
						if (window.$motive === "curiosity") {
							if (this.props.actionCases.case8[3] === true) {
							return "Take the most interesting looking books for yourself."
							} else {
								return <span className="locked">Take the most interesting looking books for yourself.</span>
							} 
						}
						break;
				}
				break;
				case 8.01:
					return "Continue."
				case 8.02:
					return "Continue."
				case 8.1:
					return "Continue."
				case 8.2:
					return "Continue."
				case 8.3:
					return "Continue."
				case "8fire":
					return "Oh dear."
			case 9:
				switch(key) {
					default:
						return "Oh dear, things have gone very wrong here. You shouldn't be seeing this at all!"
					case 0:
						if (window.$motive === "wealth") {
							return "Attempt to open the chest. If there is treasure inside, it will be yours."
						} else {
							if (this.props.stats.stat.strength >= 10) {
								return "Attempt to open the chest with force. (Requires 10 Strength)"
							} else {
								return <span className="locked">Attempt to open the chest with force. (Requires 10 Strength)</span>
							}
						}
					case 1:
						if (this.props.inventoryContents.find(item => item.id === 8)) {
							return "Attempt to open the chest using the Rusty Key. (Requires Rusty Key)"
						} else {
							return <span className="locked">Attempt to open the chest using the Rusty Key. (Requires Rusty Key)</span>
						}
					case 2:
						return "Ignore the chest and continue through the dungeon."
				};
				case 9.1:
					return "Defend yourself!"
				case 9.2:
					return "Defend yourself!"
				case 9.3:
					return "Defend yourself!"
				case "9unlock":
					return "Defend yourself!"
				case "9loot":
					return "Continue"
				case 9.4:
					return "Continue"
			case 10:
				switch(key) {
					default:
						return "Oh dear, things have gone very wrong here. You shouldn't be seeing this at all!"
					case 0:
						return "Carefully look over the edge of the chasm."
					case 1:
						return "Attempt to leap across the gap. (This could end badly for you)"
					case 2:
						if (this.props.stats.stat.dexterity >= 6) {
							return "Confidently leap across the gap. (Requires 6 Dexterity)"
						} else {
							return <span className="locked">Confidently leap across the gap. (Requires 6 Dexterity)</span>
						};
				};
				case 10.1:
					return "Continue"
				case "10.2success":
					return "Continue"
				case "10.2damage":
					return "Continue"
				case "10.2death":
					return "Oh dear..."
				case 10.3:
					return "Continue"
				case "10levitate":
					return "Continue"
				case 10.4:
					switch(key) {
						default:
							return "Oh dear, things have gone very wrong here. You shouldn't be seeing this at all!"
						case 0:
							if (this.props.inventoryContents.find(item => item.id === 10) || this.props.equippedItems.torso.id === 10) {
								return "Take the potion and continue."
							} else {
								return "Take the Chain Mail and continue."
							};
						case 1:
							if (this.props.inventoryContents.find(item => item.id === 10) || this.props.equippedItems.torso.id === 10) {
								return "Continue without taking the potion."
							} else {
								return "Continue without taking the Chain Mail."
							};
					};
			case 11:
				switch(key) {
					default:
						return "Oh dear, things have gone very wrong here. You shouldn't be seeing this at all!"
					case 0:
						return "Attempt to blindly find a way out of this room."
					case 1:
						if (this.props.inventoryContents.find(item => item.id === 4)) {
							return "Use your torch to light the way. (Requires Torch)"
						} else {
							return <span className="locked">Use your torch to light the way. (Requires Torch)</span>
						}
				};
				case "11.1damage":
					return "Try again."
				case "11.1success":
					return "Continue"
				case 11.2:
					return "Continue"
				case "11light":
					return "Continue"
				case "11fire":
					return "Continue"
				case 11.4:
					return "Continue"
			case 12:
				switch(key) {
					default:
						return "Oh dear, things have gone very wrong here. You shouldn't be seeing this at all!"
					case 0:
						return "Ask to hear the Sphinx's riddle."
					case 1:
						return "Attack the Sphinx. If there's going to be a fight, you may as well be the one starting it!"
				};
				case 12.1:
					return "Submit Answer"
				case 12.2:
					return "Receive your reward."
				case 12.3:
					return "Defend yourself!"
				case "12loot":
					return "Continue"
				case 12.4:
					return "Continue"
					
		};
	};
	
	keyCheck = (event) => {if (event.keyCode === 32) { //Confirm if the space bar is pressed for accessibility purposes.
		this.actionClick(event);
	}};
	
	actionSelect() { //Render rows of actions based on the value of actionNum
		let actions = [];
		if (this.props.inputRequired === true) {
			actions.push(<div className="itemsTitle">Enter your answer:</div>);
			actions.push(<input className="input" id="userInput" data-value="input" key="input"></input>);
		};
		for (let x = 0; x < this.props.actionNum; x++) {
			actions.push(<div className="action" data-value={x} key={x} onClick={this.actionClick} onKeyDown={this.keyCheck} tabIndex="0">{this.componentDidMount(x)}</div>);
		};
		return actions;
	};
	
	actionClick = (event) => { //Set new value to render next screen.
		let value = Number(event.target.dataset.value);
		switch(this.props.value) {
			case "emptySpell":
				v = window.$inventoryValueSnapshot;
				a = window.$inventoryActionSnapshot;
				break;
			case "spellScrollNoSpellbook":
				v = "inventory";
				a = this.props.inventoryContents.length;
				break;
			case "spellScroll":
				v = "inventory"
				a = this.props.inventoryContents.length;
				break;
			case "allSpells":
				this.props.statsHandler(0, 0, 1, 0);
				v = window.$spellPickerValueSnapshot;
				a = window.$spellPickerActionSnapshot;
				break;
			case 0:
				switch(value) {
					default:
						break;
					case 0:
						v = 1;
						a = 1;
						window.$motive = "wealth";
						break;
					case 1:
						v = 1;
						a = 1;
						window.$motive = "revenge";
						break;
					case 2:
						v = 1;
						a = 1;
						window.$motive = "curiosity";
						break;
				}
				break;
			case 1:
				v = 2;
				a = 0;
				break;
			case 3:
				switch(value) {
					default:
						break;
					case 0:
						v = 4;
						a = 1;
						this.props.inventoryHandler(1); //Sword
						this.props.itemEquipHandler(Items.find((item) => item.id === 1));
						break;
					case 1: 
						v = 4;
						a = 1;
						this.props.inventoryHandler(2); //Bow
						this.props.itemEquipHandler(Items.find((item) => item.id === 2));
						break;
					case 2: 
						v = 4;
						a = 1;
						this.props.inventoryHandler(3); //Spellbook
						this.props.itemEquipHandler(Items.find((item) => item.id === 3));
						this.props.spellbookUpdate(1);
				}
				break;
			case 4:
				v = 5;
				a = 4;
				break;
			case 5:
				switch(value) {
					default:
						break;
					case 0:
						v = 6; //move on to the next scene and fight.
						a = 1;
						break;
					case 1:
						if (this.props.actionCases.case5[1] === true) {
							v = 5.1; //try and leave but find the door is sealed.
							a = 1;
							this.props.lock(5, 1);
							break;
						}
					break;
					case 2:
						if (this.props.stats.stat.strength >= 3) {
							if (this.props.actionCases.case5[2] === true) {
								v = 5.2; //take a torch and add it to the inventory.
								a = 1;
								this.props.inventoryHandler(4);
								this.props.lock(5, 2);
								break;
							}
						} else {
							break;
						}
					break;
					case 3:
						if (this.props.stats.stat.intelligence >= 3) {
							if (this.props.actionCases.case5[3] === true) {
								v = 5.3; //examine the torches and discover magical fire.
								a = 1;
								this.props.lock(5, 3);
								Items[3].description = "A flaming length of wood that provides light and magical, ever-burning fire."
							}
						} else {
							break;
						}
				}
				break;
				case 5.1:
					switch(value) {
						default:
							break;
						case 0:
							v = 5;
							a = 4;
							break;
					}
				break;
				case 5.2:
					switch(value) {
						default:
							break;
						case 0:
							v = 5;
							a = 4;
							break;
					}
				break;
				case 5.3:
					switch(value) {
						default:
							break;
						case 0:
							v = 5;
							a = 4;
							break;
					}
				break;
			case 6: //Suddenly, Skeleton!
				window.$combatValueSnapshot = "6loot";
				v = "combat";
				c = 1;
				break;
				case "6loot": //Combat loot
					v = 6.1;
					a = 1;
					c = "";
					this.props.inventoryHandler(5); //Leather Helmet
					this.props.itemEquipHandler(Items.find((item) => item.id === 5));
					if (this.props.inventoryContents.find(item => item.id === 4)) {
						this.props.inventoryHandler(6); //Healing Potion
					};
					break;
				case 6.1:
					v = 7;
					a = 1;
					break;
			//Case 7 goes to default.
			case 8:
				switch(value) {
					default:
						break;
					case 0:
						this.props.lock(8, 0);
						let roll = RollD20();
						if (roll <= 10) {
							v = 8.01; //No damage
						} else {
							v = 8.02 //Take damage
						}
						a = 1;
						break;
					case 1:
						if (this.props.actionCases.case8[1] === true) {
							if (this.props.stats.stat.intelligence >= 6) {
								this.props.lock(8, 1);
								v = 8.1;
								a = 1;
							} else {
								break;
							}
						} else {
							break;
						}
						break;
					case 2: //Add spell to spellbook.
						if (this.props.actionCases.case8[2] === true) {
							if (this.props.equippedItems.weapon.id === 3 || this.props.inventoryContents.find(item => item.id === 3)) {
								if (this.props.spellbook.length === SpellList.length) { //This is done like this instead of the built in method of spellPicker because the state updates asynchronously and it prevents it from working correctly.
									window.$spellPickerValueSnapshot = this.props.value;
									window.$spellPickerActionSnapshot = this.props.actionNum;
									this.props.lock(8, 2);
									v = "allSpells";
									a = 1;
								} else {
									this.props.spellPickerHandler();
									this.props.lock(8, 2);
									v = 8.2;
									a = 1;
									break;
								};
							};
						};
						break;
					case 3: //Collection of Books
						if (this.props.actionCases.case8[3] === true) {
							this.props.lock(8, 3);
							this.props.inventoryHandler(7); 
							v = 8.3;
							a = 1;
						} else {
							break;
						}
						break;
				}
				break;
				case 8.02:
					this.props.hitPointsUpdate(-4);
					v = Chambers(this.props)[0];
					a = Chambers(this.props)[1];
					this.props.spellCooldownUpdate();
					break;
				case 8.2:
					v = 8;
					a = window.$inventoryActionSnapshot;
					break;
				case 8.3:
					v = 8;
					a = window.$inventoryActionSnapshot;
					break;
				case "8fire":
					this.props.gameover();
					break;
			case 9:
				switch(value) {
					default:
						break;
					case 0:
						if (window.$motive === "wealth") {
							v = 9.1;
							a = 1;
						} else {
							if (this.props.stats.stat.strength >= 10) {
								v = 9.2;
								a = 1;
							} else {
								break;
							}
						}
						break;
					case 1:
						if (this.props.inventoryContents.find(item => item.id === 8)) {
							v = 9.3;
							a = 1;
							this.props.inventoryRemove(8);
						} else {
							break;
						}
						break;
					case 2:
						v = Chambers(this.props)[0];
						a = Chambers(this.props)[1];
						this.props.spellCooldownUpdate();
						break;
				}
				break;
				case 9.1:
					window.$combatValueSnapshot = "9loot"
					v = "combat";
					c = 2;
					break;
				case 9.2:
					window.$combatValueSnapshot = "9loot"
					v = "combat";
					c = 2;
					break;
				case 9.3:
					window.$combatValueSnapshot = "9loot"
					v = "combat";
					c = 2;
					break;
				case "9unlock":
					window.$combatValueSnapshot = "9loot"
					v = "combat";
					c = 2;
					break;
				case "9loot": //Combat loot
					v = 9.4;
					a = 1;
					c = "";
					this.props.itemPickerHandler(2, 2);
					break;
				//Case 9.4 goes to default.
			case 10:
				switch(value) {
					default:
						break;
					case 0:
						v = 10.1;
						a = 1;
						break;
					case 1:
						let roll = RollD20();
						if (roll > 10) {
							v = "10.2success";
						} else if (roll > 3) {
							v = "10.2damage";
						} else {
							v = "10.2death";
						};
						a = 1;
						break;
					case 2:
						if (this.props.stats.stat.dexterity >= 6) {
							v = 10.3;
							a = 1;
							break;
						} else {
							break;
						};
				};
				break;
				case 10.1:
					v = 10;
					a = 3;
					break;
				case "10.2success":
					v = 10.4;
					a = 2;
					break;
				case "10.2damage":
					this.props.hitPointsUpdate(-3);
					v = 10.4;
					a = 2;
					break;
				case "10.2death":
					this.props.gameover()
					break;
				case 10.3:
					v = 10.4;
					a = 2;
					break;
				case "10levitate":
					v = 10.4;
					a = 2;
					break;
				case 10.4:
					switch(value) {
						default:
							break;
						case 0:
							this.props.inventoryContents.find(item => item.id === 10) || this.props.equippedItems.torso.id === 10 ? this.props.inventoryHandler(6) : this.props.inventoryHandler(10); //Chain Mail
							v = Chambers(this.props)[0];
							a = Chambers(this.props)[1];
							this.props.spellCooldownUpdate();
							break;
						case 1:
							v = Chambers(this.props)[0];
							a = Chambers(this.props)[1];
							this.props.spellCooldownUpdate();
							break;
					};
					break;
			case 11:
				switch(value) {
					default:
						break;
					case 0:
						if (RollD10() < 4) {
							v = "11.1success";
							a = 1;
							break;
						} else {
							this.props.hitPointsUpdate(-2);
							v = "11.1damage";
							a = 1;
							break;
						};
					case 1:
						if (this.props.inventoryContents.find(item => item.id === 4)) {
							v = 11.2;
							a = 1;
							break;
						} else {
							break;
						};
					case "11light":
						v = 11.3
						a = 1;
						break;
				};
				break;
				case "11.1damage":
					v = 11;
					a = 2;
					break;
				case "11.1success":
					this.props.statsHandler(0, 2, 0, 0);
					v = 11.4;
					a = 1;
					break;
				case 11.2:
					this.props.statsHandler(0, 2, 0, 0);
					v = 11.4;
					a = 1;
					break;
				case "11light":
					this.props.statsHandler(0, 2, 0, 0);
					v = 11.4;
					a = 1;
					break;
				case "11fire":
					v = 11;
					a = 2;
					break
				//case 11.4 goes to default.
			case 12:
				switch(value) {
					default:
						break;
					case 0:
						this.props.requireInput(true);
						v = 12.1;
						a = 1;
						break;
					case 1:
						window.$combatValueSnapshot = "12loot"
						v = "combat";
						c = 3;
						break;
				}
				break;
				case 12.1:
					let answer = document.getElementById("userInput").value.toLowerCase();
					let answers = ["clock", "a clock", "watch", "a watch", "timepiece", "a timepiece", "time piece", "a time piece"];
					if (answers.includes(answer)) {
						this.props.requireInput(false);
						v = 12.2;
						a = 1;
						break;
					} else {
						this.props.requireInput(false);
						v = 12.3;
						a = 1;
						break;
					};
				case 12.2:
					this.props.hitPointsMaxHandler(5);
					this.props.itemPickerHandler(3, 2);
					this.props.lock(12, 0);
					v = 12.4;
					a = 1;
					break;
				case 12.3:
					window.$combatValueSnapshot = "12loot"
					v = "combat";
					c = 3;
					break;
				case "12loot":
					this.props.itemPickerHandler(3, 2);
					v = 12.4;
					a = 1;
					break;		
				//case 12.4 goes to default.
			default:
				v = Chambers(this.props)[0];
				a = Chambers(this.props)[1];
				this.props.spellCooldownUpdate();
				break;
		}
		this.props.mainHandler(v, a); //v is the value to be passed back to main.js to change state. a is the number of actions to be shown.
		this.props.enemyNumberUpdate(c);
	}
	
	render() {
		return <div className="actions">{this.actionSelect()}</div>
	}
}

export default Actions;