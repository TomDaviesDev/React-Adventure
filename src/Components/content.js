import React from 'react';
import Statistics from './statistics.js'

class Content extends React.Component {
	contentSelect() {
		switch(this.props.value) {
			default:
				return <div className="content">
					<p>This is currently as far as the project goes. All systems have been implemented, I just haven't written all of the actual content yet.</p>
					<p>This project was just intended for me to practice and become more familiar with React, a goal which has definitely been fulfilled, but I may return and finish the actual game at some point.</p>
					<p>Thank you for playing!</p>
				</div>
			case "emptySpell":
				return <div className="content">
					<p>Your spell will not do anything useful here.</p>
				</div>
			case "spellScrollNoSpellbook":
				return <div className="content">
					<p>Unfortunately you have no spellbook to copy this scroll into.</p>
				</div>
			case "spellScroll":
				return <div className="content">
					<p>You carefully copy the spell into your spellbook.</p>
					<p>You add the {this.props.latestSpell.name} spell to your spellbook.</p>
				</div>
			case "allSpells":
				return <div className="content">
					<p>It seems that you already know every spell that you can. You are truly a master of the arcane!</p>
					<p>Since I have no more spells for you, have a slight increase to your Intelligence instead.</p>
				</div>
			case 0:
				return <div className="content">
					<p>You are standing before an imposing wooden door. The trees around you are silent as you take in the dark wood and iron bands of the door that leads into the depths of the mountain.</p>
					<p>You know that beyond it lies the infamous dungeon of Malthazor, the Mad Mage.</p>
					<p>You find yourself on a dangerous quest, but what has brought you here?</p>
				</div>
			case 1:
				switch(window.$motive) {
					default:
						return "This is an error."
					case "wealth":
						return <div className="content">
							<p>The lure of fabulous riches has drawn many adventurers to seek their fortune upon dangerous quests.</p>
							<p>But it would be folly to enter Malthazor's dungeon without proper preparation.</p>
							<p>What skills do you have?</p>
						</div>
					case "revenge":
						return <div className="content">
							<p>The righting of a terrible wrong. Surely there can be no nobler reason for setting out upon a dangerous quest. </p>
							<p>But it would be folly to enter Malthazor's dungeon without proper preparation.</p>
							<p>What skills do you have?</p>
						</div>
					case "curiosity":
						return <div className="content">
							<p>The gathering of knowledge and secrets is always an irresistible call for certain individuals to embark upon a dangerous quest.</p>
							<p>But it would be folly to enter Malthazor's dungeon without proper preparation.</p>
							<p>What skills do you have?</p>
						</div>
				}
			case 2:
				if (this.props.allocate.allocate === true) {
					return <div className="content">
						<p>Choose your starting statistics.</p>
						<p>Select one of the statistics to see information about it.</p>
						<Statistics {...this.props} 
									statsHandler={this.props.statsHandler}
									mainHandler={this.props.mainHandler}
									allocateHandler={this.props.allocateHandler} />
					</div>
				} else {
					return <div className="content"><Statistics {...this.props}
																statsHandler={this.props.statsHandler}
																mainHandler={this.props.mainHandler}
																allocateHandler={this.props.allocateHandler} />
					</div>
				}
			case 3:
				return <div className="content">
					<p>What weapon did you bring to Malthazor's Dungeon?</p>
				</div>
			case 4:
				return <div className="content">
					<p>Your resolve steeled, you prepare to continue your quest.</p>
					<p>Who knows what kind of twisted labyrinth you are about to face?</p>
					<p>You push open the heavy doors and enter the dungeon of Malthazor, the Mad Mage.</p>
				</div>
			case 5:
				return <div className="content">
					{this.props.actionCases.case5.every(Boolean) !== false && <p>The heavy door closes behind you with a resounding thud.</p>}
					<p>You are standing in a small stone antechamber. Flaming torches sit in sconces on the wall, casting a flickering glow across the small room.</p>
					<p>You are alone. Opposite you is a dark passage, the light from the torches falling short of the archway.</p>
					<p>All things considered, this is not as harrowing a start to Malthazor's dungeon as one might expect.</p>
					<p>What will you do?</p>
				</div>
				case 5.1:
					return <div className="content">
						<p>You attempt to open the door you passed through. Locked! Magically sealed! Or possibly just not openable from the inside. It would appear that retreat is not an option.</p>
					</div>
				case 5.2:
					return <div className="content">
						<p>You carefully wrench a torch free from the wall.</p>
					</div>
				case 5.3:
					return <div className="content">
						<p>You examine the torches around the wall. As you suspected, the torches are in fact magical in nature. The flame atop them will never burn down. Handy.</p>
					</div>
			case 6:
				return <div className="content">
					<p>You enter the darkened passageway across the room.</p>
					{this.props.inventoryContents.find(item => item.id === 4) ? <p>You shine your torch to illuminate the way ahead of you.</p> : null}
					<p>As you advance cautiously you spot movement in the darkness.</p>
					<p>A (surprisingly ambulatory) skeleton leaps from beyond your field of vision and attacks you!</p>
				</div>
				case "6loot":
					return <div className="content">
						{this.props.allocate.allocate === true &&
							<div className="allocateNotification">
								<p>You have gained 2 points to improve your skills!</p>
								<p className="allocateNotificationSubtitle">(You can allocate them in your Inventory.)</p>
							</div>
						}
						<p>On the skeleton's head you see an old, but presumably still functional, leather helmet.</p>
						<p>It would be a shame to let it go to waste.</p>
						{this.props.inventoryContents.find(item => item.id === 4) ? <p>In the light of your torch, you also notice the glint of a small bottle tucked into an alcove in the wall. A healing potion!</p> : null}
					</div>
				case 6.1:
					return <div className="content">
						{this.props.inventoryContents.find(item => item.id === 4) ? <p>You have gained a Leather Helmet and a Healing Potion!</p> : <p>You have gained a Leather Helmet!</p>}
						<p>The Leather Helmet provides 1 point of armour while worn.</p>
						<p>Each point of armour reduces damage that you take by 1.</p>
					</div>
			case 7:
				return <div className="content">
					<p>The first guardian of Malthazor's dungeon defeated, you face the passage beyond.</p>
					<p>Wait, was that a guardian? <span className="textSmall">It might have just been an angry local skeleton...</span></p>
					<p>Regardless, it's been beaten, and your journey into the dungeon begins in earnest.</p>
					<p className="contentExtra">(From this point onward, the chambers you find yourself in will be randomly generated. The challenges that you face may be too powerful for you on your first attempt. Persevere and make it through enough of them while building your strength along the way and you might come face to face with Malthazor himself. Good luck.)</p>
				</div>
			case 8: 
				return <div className="content">
					<p>You are in some sort of library. The walls are covered almost entirely by bookshelves filled with ancient looking books.</p>
					{window.$motive === "curiosity" ? <p>Some of these books would doubtless be of value to you.</p> : null}
					<p>There are no visible doors leading onward.</p>
					<p>What will you do?</p>
				</div>
					case 8.01:
						return <div className="content">
							<p>You search the bookcases around the room for an exit.</p>
							<p>After a few minutes of searching, you find that one of the bookcases seems to be moveable.</p>
							<p>Success! With some effort you are able to pull the bookcase from its position and a doorway is revealed.</p>
						</div>
					case 8.02:
						return <div className="content">
							<p>You search the bookcases around the room for an exit.</p>
							<p>After a few minutes of searching, you find that one of the bookcases seems to be moveable.</p>
							<p>Calamity! With some effort you are able to pull the bookcase from its position and a doorway is revealed, but in the process some part of the mechanism injures you. </p>
							<p>You take 4 points of damage!</p>
						</div>
					case 8.1:
						return <div className="content">
							<p>You carefully examine the bookshelves that line the walls of this room, looking for a way out.</p>
							<p>Wait a moment, what was that? "An Exploration of Concealed Egress". What a preposterously suspicious name for a book.</p>
							<p>You pull the book from the shelf and... Yes! The book is in fact part of a lever mechanism.</p>
							<p>To your left, a bookcase swings open, and the way forward is open.</p>
						</div>
					case 8.2:
						return <div className="content">
							<p>You spend some time perusing the books for signs of magical scribing.</p>
							<p>Eventually you find a battered volume that seems to have once been a spellbook, but only one spell is currently legible.</p>
							<p>Still, one is better than none!</p>
							<p>You add the {this.props.latestSpell.name} spell to your own spellbook.</p>
						</div>
					case 8.3:
						return <div className="content">
							<p>You abstract a few of the most interesting looking books and add them to your pack.</p>
						</div>
					case "8fire": 
						return <div className="content">
							<p>You unleash a {this.props.previousSpell.name} into the room.</p>
							<p>The room full of old books.</p>
							<p>...</p>
							<p>Highly <strong>flammable</strong> books.</p>
							<p>You have only a few seconds to reflect upon the poor decision you made before the fire has engulfed the entire room, and you along with it.</p>
						</div>
			case 9:
				return <div className="content">
					<p>You are in an almost empty room with a single wooden chest in the center of it. </p>
					{window.$motive === "wealth" ? <p>The allure of potential riches in that chest is tempting. After all, that's why you're here, isn't it?</p> : null}
					<p>There is a door on the other side of the room{window.$motive === "wealth" ? ", but your attention is focused on the chest" : null}.</p>
					<p>What will you do?</p>
				</div>
				case 9.1:
					return <div className="content">
						<p>You lift the heavy lid of the chest, eager to see what lies within.</p>
						<p>Unfortunately, what lies within is a large, fleshy purple tongue.</p>
						<p><span className="textSmall">Strange... Why would somebody keep a tongue in a che-</span> Oh! It's a Mimic!</p>
						<p>The chest seemingly comes to life and attacks you!</p>
					</div>
				case 9.2:
					return <div className="content">
						<p>You heave against the lid of the chest, straining to break the lock.</p>
						<p>There! A snapping sound! The heavy lid flies open and you peer inside to see what lies within.</p>
						<p>Unfortunately, what lies within is a large, fleshy purple tongue.</p>
						<p><span className="textSmall">Strange... Why would somebody keep a tongue in a che-</span> Oh! It's a Mimic!</p>
						<p>The chest seemingly comes to life and attacks you!</p>
					</div>
				case 9.3:
					return <div className="content">
						<p>The Rusty Key looks as if it may be a fit for this lock.</p>
						<p>You try your luck and insert the key. The chances of success here are slim, given the sheer number of locks and keys in the world.</p>
						<p>But wait! A click! The Rusty Key works and unlocks the chest. You peer inside as you open the lid, to see what lies within.</p>
						<p>Unfortunately, what lies within is a large, fleshy purple tongue.</p>
						<p><span className="textSmall">Strange... Why would somebody keep a tongue in a che-</span> Oh! It's a Mimic!</p>
						<p>The chest seemingly comes to life and attacks you!</p>
					</div>
				case "9unlock":
					return <div className="content">
						<p>You chant the words of the Unlock spell from your spellbook, complete with the complicated and silly looking hand movements that are required to cast all spells.</p>
						<p>Success! You hear a click as the spell unlocks the chest. You peer inside as you open the lid, to see what lies within.</p>
						<p>Unfortunately, what lies within is a large, fleshy purple tongue.</p>
						<p><span className="textSmall">Strange... Why would somebody keep a tongue in a che-</span> Oh! It's a Mimic!</p>
						<p>The chest seemingly comes to life and attacks you!</p>
					</div>
			case "9loot":
				return <div className="content">
					<p>The Mimic shudders violently... And stops moving.</p>
					<p>Its long purple tongue unfolds and reveals the items that it had been protecting.</p>
					<p className="textSmall">Or possibly had just eaten. You're not a mimicologist, you don't know about their diets or feeding habits.</p>
					{this.props.allocate.allocate === true &&
						<div className="allocateNotification">
							<p>You have gained 4 points to improve your skills!</p>
							<p className="allocateNotificationSubtitle">(You can allocate them in your Inventory.)</p>
						</div>
					}
				</div>
				case 9.4:
					return <div className="content">
						{this.itemRewards()}
					</div>
			case 10:
				return <div className="content">
					<p>You are in a room with a large hole in the ground. Well, more of a chasm really. It stretches across the entire room and is a clear impediment to your progress.</p>
					<p>There appears to be no other way forward. You will have to attempt to cross the chasm.</p>
					<p>What will you do?</p>
				</div>
				case 10.1:
					return <div className="content">
						<p>You carefully peer over the edge of the chasm.</p>
						<p>It descends into darkness and you cannot see the bottom.</p>
						<p>Best not fall in.</p>
					</div>
				case "10.2success":
					return <div className="content">
						<p>You prepare to jump, balancing carefully before running towards the edge.</p>
						<p>You leap... and just barely clear the chasm, landing safely on the other side.</p>
						<p>A small piece of stone slips as you land and topples over the edge. You do not hear it hit the bottom.</p>
					</div>
				case "10.2damage":
					return <div className="content">
						<p>You prepare to jump, balancing carefully before running towards the edge.</p>
						<p>You leap... and almost clear the chasm. You slam into the opposite edge and scramble for purchase.</p>
						<p>Below you the chasm stretches into darkness, with no bottom in sight.</p>
						<p>As you catch your breath, you are able to slowly pull yourself up onto solid ground. You are slightly injured, but safe.</p>
						<p>You receive 3 points of damage.</p>
					</div>
				case "10.2death":
					return <div className="content">
						<p>You prepare to jump, balancing carefully before running towards the edge.</p>
						<p>You leap... and fall short.</p>
						<p>You plummet into the darkness below.</p>
						<p>One day, you will hit the bottom.</p>
					</div>
				case 10.3:
					return <div className="content">
						<p>The distance to the other side of this chasm is not so long as to be insurmountable. In fact, for somebody as dextrous as you, it would be <strong>quite</strong> surmountable.</p>
						<p>You prepare to jump, balancing carefully before running towards the edge.</p>
						<p>With a leap that would be the envy of athletic long jumpers everywhere, you clear the chasm safely.</p>
						<p>It's a pity nobody was around to see that.</p>
					</div>
				case "10levitate":
					return <div className="content">
						<p>You chant the words of the Levitate spell from your spellbook, complete with the complicated and silly looking hand movements that are required to cast all spells, as well as the occasional small hop that is required by the Levitate spell specifically.</p>
						<p>Your hopping is not in vain, as the spell takes effect and your final hop lifts you into the air, floating as if weightless.</p>
						<p>You float easily across the chasm before the spell wears off, landing safely on the other side.</p>
					</div>
				case 10.4:
					return <div className="content">
						<p>You have made it safely across the chasm. Ahead of you is the door leading forwards.</p>
						{this.props.inventoryContents.find(item => item.id === 10) || this.props.equippedItems.torso.id === 10 ?
							<p>Now that you're closer, you notice a small table in the corner, with a Healing Potion upon it.</p> :
							<p>Now that you're closer, you notice an armour stand leaning haphazardly in the corner of the room, complete with a rather fine looking set of Chain Mail.</p>
						}
					</div>
			case 11:
				return <div className="content">
						<p>You are in a completely dark room.</p>
						<p>There is no light whatsoever.</p>
						<p>What will you do?</p>
					</div>
				case "11.1damage":
					return <div className="content">
						<p>You attempt to make your way through the pitch black room.</p>
						<p>You cannot tell how far into the room you make it before you feel the sharp point of a spike against your skin, stopping you in your tracks.</p>
						<p>You receive 2 points of damage.</p>
						<p>There is nothing to do but try again.</p>
					</div>
				case "11.1success":
					return <div className="content">
						<p>You attempt to make your way through the pitch black room.</p>
						<p>Moving carefully and stopping abruptly at the slightest indication of something against your skin, you are able to move through the room unharmed, avoiding the dangers present.</p>
						<p>Miraculously, you eventually reach out and feel the door leading out of the room. You feel as if you've learned something from your careful navigation of this room.</p>
					</div>
				case 11.2:
					return <div className="content">
						<p>You pull out your torch{this.props.actionCases.case5[3] === false ? <span> which, thanks to the enchantment upon it, still burns bright</span> : null}. The flame illuminates the room around you.</p>
						<p>Surrounding you are jagged spikes that seem to be made from a dull coloured metal, forming some sort of twisted maze through them. Trying to navigate this room without light would be an extremely dangerous experience.</p>
						<p>Thanks to your torch, it is instead only a fairly dangerous experience. These spikes look sharp enough to poke you into a kebab if you take a step wrong, but at least you can see where they are and carefully make your way through them.</p>
						<p>You make it to exit on the other side of the room unharmed. As a bonus, you feel as if you've learned something from your careful navigation of this room.</p>
					</div>
				case "11light":
					return <div className="content contentExtra">
						<p>You chant the words of the Light spell from your spellbook, though this particular spell has thankfully few of the complicated and silly looking hand movements that are required to cast all spells.</p>
						<p>As you complete the spell a ball of light bursts from your palm, illuminating the room around you.</p>
						<p>Surrounding you are jagged spikes that seem to be made from a dull coloured metal, forming some sort of twisted maze through them. Trying to navigate this room without light would be an extremely dangerous experience.</p>
						<p>Thanks to your Light spell, it is instead only a fairly dangerous experience. These spikes look sharp enough to poke you into a kebab if you take a step wrong, but at least you can see where they are and carefully make your way through them.</p>
						<p>You make it to exit on the other side of the room unharmed. As a bonus, you feel as if you've learned something from your careful navigation of this room.</p>
					</div>
				case "11fire":
					return <div className="content">
						<p>You cast your {this.props.previousSpell.name} into the room.</p>
						<p>The light generated by the spell lasts for only a second, and gives you a glimpse of the jagged spikes surrounding you.</p>
						<p>Unfortunately, your {this.props.previousSpell.name} just doesn't generate enough light to navigate by.</p>
					</div>
				case 11.4:
					return <div className="content">
						<p>Your Dexterity has increased by 2.</p>
					</div>
			case 12:
				return <div className="content">
						<p>You are in a room with a large creature with the head of a woman, body of a lion and wings of a bird. A Sphinx!</p>
						<p>The Sphinx eyes you as bird of prey might eye a small rodent. She speaks, and her voice is a low rasp.</p>
						<p>"Answer my riddle correctly and you may pass me unscathed. Answer wrong, or fail to answer at all, and I shall attack you."</p>
						<p>What will you do?</p>
					</div>
				case 12.1:
					return <div className="content">
						<p>The Sphinx looks at you intently for a few moments, then recites the following:</p>
						<p>"I have hands, but no arms and a face, but no eyes.</p>
						<p>Without fingers, I point and without feet, I run.</p>
						<p>What am I?"</p>
					</div>
				case 12.2:
					return <div className="content">
						<p>The Sphinx bares her teeth, but you realise with relief that she is smiling.</p>
						<p>"That is the correct answer. You may pass."</p>
						<p>She raises herself from her relaxed position on the floor moves aside, clearing your path to the doorway on the opposite side of the room.</p>
						<p>"But first, I would reward your perspicacity."</p>
						<p>You feel the Sphinx's magic wash over your body.</p>
					</div>
				case 12.3:
					return <div className="content">
						<p>The Sphinx glares at you.</p>
						<p>"You have failed to answer correctly."</p>
						<p>She raises herself from her relaxed position on the floor and moves to attack!</p>
					</div>
				case "12loot":
					return <div className="content">
						<p>The Sphinx staggers backwards and collapses against the wall of the chamber.</p>
						<p>"Enough. I yield. You have bested me."</p>
						<p>She lowers herself slowly into a sitting position and looks at you respectfully.</p>
						<p>"I cannot defeat you. Take your prizes, and go."</p>
						{this.props.allocate.allocate === true &&
							<div className="allocateNotification">
								<p>You have gained 8 points to improve your skills!</p>
								<p className="allocateNotificationSubtitle">(You can allocate them in your Inventory.)</p>
							</div>
						}
					</div>
				case 12.4:
					return <div className="content">
						{this.props.actionCases.case12[0] === false ? <p>Your maximum hit points have increased by 5!</p> : null}
						{this.itemRewards()}
					</div>
		};
	};

	itemRewards = () => {
		let text = [];
		for (let x = 0; x < this.props.receivedItems.length; x++) {
			text.push(<p key={x}>You receive a {this.props.receivedItems[x].name}.</p>);
		};
		return text;
	};
	
	render() {
		return this.contentSelect();
	}
}

export default Content;