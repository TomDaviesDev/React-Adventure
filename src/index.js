import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheet.css';
import Main from './Components/main'

//Snapshots are taken here for simplicity's sake. These could be converted into state of Main (though this is simpler - and if it ain't broke, don't fix it).
window.$motive = ""; //Character motivation - set at case 0.
window.$inventoryValueSnapshot = ""; //Snapshot of value when opening inventory - set at text.js.
window.$inventoryActionSnapshot = ""; //Snapshot of actionNum when opening inventory - set at text.js.
window.$combatValueSnapshot = ""; //Snapshot of value when entering combat - set at action.js at each combat encounter. NOTE: value set is + .1 to move onto loot post-combat.
window.$spellPickerValueSnapshot = ""; //Snapshot of value when all spells are unlocked. Used to return to previous scene when allSpellsUnlocked is true - set at spellPicker() and action case 8;
window.$spellPickerActionSnapshot = ""; //Snapshot of actionNum when spellPicker function is run - set at spellPicker() and action case 8;

ReactDOM.render(<Main />, document.getElementById('root'));