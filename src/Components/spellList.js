const SpellList = [
		{
			id: 1,
			name: "Firebolt",
			canBeUsedInCombat: true,
			damage: "1d8",
			treasure: 1,
			level: 0,
			description: "A small mote of conjured fire, usually thrown at a target. Enough to light a candle or small fire, probably not enough to set a liar's pants on fire."
		},
		
		{
			id: 2,
			name: "Unlock",
			canBeUsedInCombat: false,
			treasure: 1,
			level: 0,
			description: <span>A spell that can be used to unlock any non-magical lock when touched. Now, be good with this one. It's not <strong>technically</strong> legal, but... You're magic. What are they going to do, arrest you?</span>
		},
		
		{
			id: 3,
			name: "Light",
			canBeUsedInCombat: false,
			treasure: 1,
			level: 0,
			description: "Summons a ball of magical light to illuminate your surroundings. Magical lampshade sold separately."
		},
		
		{
			id: 4,
			name: "Heal",
			canBeUsedInCombat: true,
			healing: "2d4",
			treasure: 1,
			cooldown: 4,
			level: 0,
			description: "Restores some hit points to you. Requires 3 chambers or turns in combat to cooldown between uses. Speak to your healer if side effects persist for more than 3 turns."
		},
		
		{
			id: 5,
			name: "Shield",
			canBeUsedInCombat: true,
			treasure: 1,
			duration: 4,
			level: 0,
			description: "Conjures a shield of magical energy to protect you. Increases your armour rating by 3 for 3 turns in combat. Lighter than an actual shield."
		},
		
		{
			id: 6,
			name: "Levitate",
			canBeUsedInCombat: false,
			treasure: 1,
			level: 0,
			description: "Magically lifts you from the ground (or other surface) for a short while, allowing you to float in the air. Understanding of gravity not required."
		},
		
		{
			id: 7,
			name: "Lightning Bolt",
			canBeUsedInCombat: true,
			damage: "2d10",
			treasure: 3,
			cooldown: 4,
			level: 14,
			description: "A blast of lightning that will electrify anything it hits. Do NOT use it in the bath. Seriously. There have been legal proceedings about this."
		},
		
		{
			id: 8,
			name: "Fireball",
			canBeUsedInCombat: true,
			damage: "3d6",
			treasure: 2,
			cooldown: 3,
			level: 12,
			description: "A small mote of conjured fire that will turn into a large explosion of fire on contact with a target. Not suitable for children under 3 years old."
		},
		
		{
			id: 9,
			name: "Rejuvenate",
			canBeUsedInCombat: true,
			healing: "4d4",
			treasure: 3,
			cooldown: 6,
			level: 15,
			description: "Restores quite a lot of hit points to you. Requires 5 chambers or turns in combat to cooldown between uses. Not an effective counter to the aging process."
		},
		
		{
			id: 10,
			name: "Blade Storm",
			canBeUsedInCombat: true,
			damage: "5d4",
			treasure: 3,
			cooldown: 5,
			level: 16,
			description: "Conjures a cloud of magical knives to attack your target. Can also be used to save time in the kitchen (minimum safe distance advised)."
		},
		
		{
			id: 11,
			name: "Inferno",
			canBeUsedInCombat: true,
			damage: "10d4",
			cooldown: 5,
			level: 20,
			description: "An immensely powerful spell given to you by a very clever and impressive old man (who also wrote this description)."
		},
	];
export default SpellList