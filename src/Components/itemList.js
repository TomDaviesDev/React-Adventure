const ItemList = [
		{
			id: 1,
			name: "Sword",
			stat: "strength",
			damage: "1d8",
			bonus: 0,
			magic: false,
			equipable: true,
			equipSlot: "weapon",
			treasure: 2,
			level: 0,
			description: "A short iron sword that excels at sharply poking things."
		},
		
		{
			id: 2,
			name: "Shortbow",
			stat: "dexterity",
			damage: "1d8",
			bonus: 0,
			magic: false,
			equipable: true,
			equipSlot: "weapon",
			treasure: 2,
			level: 0,
			description: "A shortbow that would actually be rather large if you were a dwarf."
		},
		
		{
			id: 3,
			name: "Spellbook",
			stat: "intelligence",
			magic: true,
			equipable: true,
			equipSlot: "weapon",
			treasure: 2,
			level: 0,
			description: "A book of magical spells. Neatly colour coded and organized."
		},
		
		{
			id: 4,
			name: "Torch",
			magic: true,
			equipable: false,
			description: "A flaming length of wood that provides light and fire."
		},
		
		{
			id: 5,
			name: "Leather Helmet",
			armour: 1,
			magic: false,
			equipable: true,
			equipSlot: "head",
			description: "A sturdy, though slightly dirty, leather helmet for protecting the wearer's squishy brain."
		},
		
		{
			id: 6,
			name: "Healing Potion",
			stat: "vitality",
			healing: "1d6",
			bonus: 0,
			magic: true,
			useable: true,
			treasure: 1,
			description: "A small glass bottle containing a lightly bubbling red liquid. The higher your vitality, the more hit points are restored when drinking this potion."
		},
		
		{
			id: 7,
			name: "Collection of Books",
			magic: false,
			useable: false,
			description: "A few particularly interesting looking books, taken from one of Malthazor's libraries."
		},
		
		{
			id: 8,
			name: "Rusty Key",
			magic: false,
			useable: false,
			treasure: 2,
			description: "An old key."
		},
		
		{
			id: 9,
			name: "Spell Scroll",
			magic: true,
			useable: true,
			treasure: 1,
			description: "A magical scroll containing instructions for a spell."
		},
		
		{
			id: 10,
			name: "Chain Mail",
			armour: 3,
			magic: false,
			equipable: true,
			equipSlot: "torso",
			treasure: 3,
			description: "A shirt of metal rings melded together to protect the wearer. Functional, but noisy."
		},
		
		{
			id: 11,
			name: "Mighty Axe of Chopping",
			stat: "strength",
			damage: "1d8",
			bonus: 1,
			magic: true,
			equipable: true,
			equipSlot: "weapon",
			treasure: 2,
			level: 5,
			description: <span>A magical hand axe that is probably intended for chopping up firewood, but should work just as well on Malthazor's guardians.<br />(+1 Damage Bonus)</span>
		},
		
		{
			id: 12,
			name: "Piercing Crossbow",
			stat: "dexterity",
			damage: "1d10",
			bonus: 1,
			magic: true,
			equipable: true,
			equipSlot: "weapon",
			treasure: 2,
			level: 5,
			description: <span>A magical crossbow that is ideal for overcoming tough enemy armour (or anything else that gets in the way).<br />(+1 Damage Bonus)</span>
		},
		
		{
			id: 13,
			name: "Sword of Vengeance",
			stat: "strength",
			damage: "3d10",
			bonus: 5,
			magic: true,
			equipable: true,
			equipSlot: "weapon",
			level: 15,
			description: <span>A sword magically enchanted with a spirit of vengeance.<br />(+5 Damage Bonus)</span>
		},
		
		{
			id: 14,
			name: "Bow of Vengeance",
			stat: "dexterity",
			damage: "3d10",
			bonus: 5,
			magic: true,
			equipable: true,
			equipSlot: "weapon",
			level: 15,
			description: <span>A bow magically enchanted with a spirit of vengeance.<br />(+5 Damage Bonus)</span>
		},
		
		{
			id: 15,
			name: "Spear",
			stat: "strength",
			damage: "1d10",
			armour: 1,
			bonus: 0,
			magic: false,
			equipable: true,
			equipSlot: "weapon",
			treasure: 2,
			level: 6,
			description: "A long pole of wood with a pointy bit on the end. Provides an armour bonus due to enemies being kept at a distance from you thanks to the aforementioned pointy bit."
		},
		
		{
			id: 16,
			name: "Enchanted Spear",
			stat: "strength",
			damage: "1d10",
			armour: 1,
			bonus: 1,
			magic: false,
			equipable: true,
			equipSlot: "weapon",
			treasure: 3,
			level: 8,
			description: <span>A long pole of wood with a pointy bit on the end. Provides an armour bonus due to enemies being kept at a distance from you thanks to the aforementioned pointy bit. <br />(+1 Damage Bonus)</span>
		},
		
		{
			id: 17,
			name: "Battleaxe",
			stat: "strength",
			damage: "1d12",
			bonus: 0,
			magic: false,
			equipable: true,
			equipSlot: "weapon",
			treasure: 2,
			level: 2,
			description: "A hefty two-handed axe that would probably be overkill to use to eat breakfast."
		},
		
		{
			id: 18,
			name: "Warhammer",
			stat: "strength",
			damage: "1d10",
			bonus: 0,
			magic: false,
			equipable: true,
			equipSlot: "weapon",
			treasure: 2,
			level: 2,
			description: "A large hammer for hitting very large nails (or peoples' faces)."
		},
		
		{
			id: 19,
			name: "Crushing Warhammer",
			stat: "strength",
			damage: "1d10",
			bonus: 1,
			magic: false,
			equipable: true,
			equipSlot: "weapon",
			treasure: 3,
			level: 8,
			description: <span>A warhammer designed for crushing rocks and the sternums of goblins.<br />(+1 Damage Bonus)</span>
		},
		
		{
			id: 20,
			name: "Sundering Battleaxe",
			stat: "strength",
			damage: "1d12",
			bonus: 1,
			magic: false,
			equipable: true,
			equipSlot: "weapon",
			treasure: 3,
			level: 9,
			description: <span>A battleaxe that surpasses all others at chopping firewood. So... You know, if the dungeon delving doesn't work out, you have options.<br />(+1 Damage Bonus)</span>
		},
		
		{
			id: 21,
			name: "Wizard Robes",
			stat: "intelligence",
			armour: 2,
			magicBonus: 1,
			magic: true,
			equipable: true,
			equipSlot: "torso",
			treasure: 3,
			level: 5,
			description: <span>A set of handsome Wizard Robes that provide a little magical protection and increase the potency of your spells.<br />(+1 Spell Bonus)</span>
		},
		
		{
			id: 22,
			name: "Magician Robes",
			stat: "intelligence",
			armour: 4,
			magicBonus: 2,
			magic: true,
			equipable: true,
			equipSlot: "torso",
			treasure: 4,
			level: 10,
			description: <span>A set of magical Robes designed to protect the wearer from magical mishaps caused, inevitably, by their own hubris.<br />(+2 Spell Bonus)</span>
		},
		
		{
			id: 23,
			name: "Archmage Robes",
			stat: "intelligence",
			armour: 6,
			magicBonus: 3,
			magic: true,
			equipable: true,
			equipSlot: "torso",
			treasure: 5,
			level: 15,
			description: <span>A splendid set of magical Robes fit for wearing by only the most experienced mages. Or random nobodies who have been running around a dungeon for a few hours.<br />(+3 Spell Bonus)</span>
		},
		
		{
			id: 24,
			name: "Bow of Wounding",
			stat: "dexterity",
			damage: "2d8",
			bonus: 2,
			magic: true,
			equipable: true,
			equipSlot: "weapon",
			treasure: 3,
			level: 12,
			description: <span>A bow enchanted to be especially good at skewering targets. It was originally designed for pig hunting, but since pigs are often domesticated, it was repurposed into a weapon of war instead.<br />(+2 Damage Bonus)</span>
		},
		
		{
			id: 25,
			name: "Plate Armour",
			stat: "strength",
			armour: 10,
			magic: false,
			equipable: true,
			equipSlot: "torso",
			treasure: 5,
			level: 15,
			description: <span>A set of heavy plate armour, sure to protect you from any amount of knives and forks.</span>
		},
		
		{
			id: 26,
			name: "Leather Armour",
			stat: "dexterity",
			armour: 8,
			magic: false,
			equipable: true,
			equipSlot: "torso",
			treasure: 5,
			level: 15,
			description: <span>A leather jerkin that provides good protection. The skill required isn't so much for putting it on as it is for moving without making an absolute racket.</span>
		},
		
		{
			id: 999,
			name: "Message from Spikey",
			magic: true,
			equipable: true,
			equipSlot: "gloves",
			description: "In flowing handwriting it reads: 'This is for testing and debugging purposes only. Blasted Kalphites have got all over the gears and sprockets and whatnots!'"
		},
	];
	
export default ItemList