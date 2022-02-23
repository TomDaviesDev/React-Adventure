import React from 'react';

function VitInfo(props) {
	const dismiss = () => props.dismiss("vit");
	
	React.useEffect(() => {
		document.getElementById("vitInfo").focus();
	});
	return <div id="vitInfo" className="statInfo" tabIndex="0" onBlur={() => {dismiss()}}>Vitality represents your physical and mental resilience and affects your total hit points.<br /><br />Each point of Vitality gives you 1 additional hit point.</div>
}

export default VitInfo;