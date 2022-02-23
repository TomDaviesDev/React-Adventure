import React from 'react';

function StrInfo(props) {
	const dismiss = () => props.dismiss("str");
	
	React.useEffect(() => {
		document.getElementById("strInfo").focus();
	});
	return <div id="strInfo" className="statInfo" tabIndex="0" onBlur={() => {dismiss()}}>Strength represents your physical and athletic abilities and is used when calculating damage using melee weapons such as swords.<br /><br />Every 4 points of Strength increases your damage with these weapons by 1.</div>
}

export default StrInfo;