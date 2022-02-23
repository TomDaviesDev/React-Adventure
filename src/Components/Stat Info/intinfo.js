import React from 'react';

function IntInfo(props) {
	const dismiss = () => props.dismiss("int");
	
	React.useEffect(() => {
		document.getElementById("intInfo").focus();
	});
	return <div id="intInfo" className="statInfo" tabIndex="0" onBlur={() => {dismiss()}}>Intelligence represents your ability to acquire and apply knowledge and is used for spellcasting.<br /><br />Every 4 points of Intelligence increases the damage you deal using spells by 1.</div>
}

export default IntInfo;