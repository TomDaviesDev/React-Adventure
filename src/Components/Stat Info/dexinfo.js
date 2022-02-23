import React from 'react';

function DexInfo(props) {
	const dismiss = () => props.dismiss("dex");
	
	React.useEffect(() => {
		document.getElementById("dexInfo").focus();
	});
	return <div id="dexInfo" className="statInfo" tabIndex="0" onBlur={() => {dismiss()}}>Dexterity represents your nimbleness and skill and is used when calculating damage using ranged weapons such as bows.<br /><br />Every 4 points of Dexterity increases your damage with these weapons by 1.</div>
}

export default DexInfo;