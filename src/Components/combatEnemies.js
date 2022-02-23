const CombatEnemies = [
		{
			id: 1,
			name: "Skeleton",
			hitPoints: 12,
			maxHitPoints: 12,
			statPointReward: 2,
			abilities: [
				{id: 1,
				 name: "Sword",
				 type: "attack",
				 damage: "1d4",
				 damageBonus: 1,
				 description: "The Skeleton swings wildly at you with its sword."},
				{id: 2,
				 name: "Bone Throw",
				 type: "attack",
				 damage: "1d4",
				 damageBonus: 0,
				 description: "The Skeleton also pulls one of its own bones from its body and hurls it at you."}
			]
		},
		
		{
			id: 2,
			name: "Mimic",
			hitPoints: 30,
			maxHitPoints: 30,
			statPointReward: 4,
			abilities: [
				{id: 1,
				 name: "Bite",
				 type: "attack",
				 damage: "1d8",
				 damageBonus: 0,
				 description: "The mimic gnashes at you with its sharp teeth."},
				{id: 2,
				 name: "Acid",
				 type: "attack",
				 damage: "1d12",
				 damageBonus: 2,
				 description: "The mimic spits a globule of acid at you."}
			]
		},
		
		{
			id: 3,
			name: "Sphinx",
			hitPoints: 45,
			maxHitPoints: 45,
			statPointReward: 8,
			abilities: [
				{id: 1,
				 name: "Bite",
				 type: "attack",
				 damage: "1d8",
				 damageBonus: 1,
				 description: "The sphinx bites at you with her huge teeth."},
				{id: 2,
				 name: "Claw",
				 type: "attack",
				 damage: "3d4",
				 damageBonus: 3,
				 description: "The sphinx strikes at you with her claw."},
				 {id: 3,
				 name: "Renewal",
				 type: "heal",
				 healing: "3d4",
				 healBonus: 4,
				 description: "The sphinx channels magic to heal her wounds."}
			]
		},
	];
	
export default CombatEnemies