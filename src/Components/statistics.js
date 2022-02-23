import React from 'react';
import StrInfo from './Stat Info/strinfo.js';
import DexInfo from './Stat Info/dexinfo.js';
import IntInfo from './Stat Info/intinfo.js'
import VitInfo from './Stat Info/vitinfo.js';

let oldStats;
class Statistics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showStrInfo: false,
			showDexInfo: false,
			showIntInfo: false,
			showVitInfo: false,
		};
		oldStats = this.props.stats.stat;
	}
	
	update = (event) => { //Updates assigned points.
		let action = event.target.dataset.action;
		let stat = Number(event.target.dataset.stat)
		if (action === "+") {
			switch(stat) {
				default:
					break;
				case 0:
					if (this.props.allocate.points === 0) {
						break;
					} else {
						this.props.statsHandler(1, 0, 0, 0);
						this.props.allocateHandler(true, this.props.allocate.points-1);
						break;
					}
				case 1:
					if (this.props.allocate.points === 0) {
						break;
					} else {
						this.props.statsHandler(0, 1, 0, 0);
						this.props.allocateHandler(true, this.props.allocate.points-1);
						break;
					}
				case 2:
					if (this.props.allocate.points === 0) {
						break;
					} else {
						this.props.statsHandler(0, 0, 1, 0);
						this.props.allocateHandler(true, this.props.allocate.points-1);
						break;
					}
				case 3:
					if (this.props.allocate.points === 0) {
						break;
					} else {
						this.props.statsHandler(0, 0, 0, 1);
						this.props.allocateHandler(true, this.props.allocate.points-1);
						break;
					}
			}
		} else if (action === "-") {
			switch(stat) {
				default:
					break;
				case 0:
					if (this.props.stats.stat.strength === oldStats.strength) {
						break;
					} else {
						this.props.statsHandler(-1, 0, 0, 0);
						this.props.allocateHandler(true, this.props.allocate.points+1);
						break;	
					}
				case 1:
					if (this.props.stats.stat.dexterity === oldStats.dexterity) {
						break;
					} else {
						this.props.statsHandler(0, -1, 0, 0);
						this.props.allocateHandler(true, this.props.allocate.points+1);
						break;	
					}
				case 2:
					if (this.props.stats.stat.intelligence === oldStats.intelligence) {
						break;
					} else {
						this.props.statsHandler(0, 0, -1, 0);
						this.props.allocateHandler(true, this.props.allocate.points+1);
						break;	
					}
				case 3:
					if (this.props.stats.stat.vitality === oldStats.vitality) {
						break;
					} else {
						this.props.statsHandler(0, 0, 0, -1);
						this.props.allocateHandler(true, this.props.allocate.points+1);
						break;	
					}
			}
		}
	}
	
	applyPoints = () => { //Finalizes points and disables further allocation.
		this.props.allocateHandler(false, 0);
		if (this.props.value === 2) {
			this.props.mainHandler(3, 3);
		};
	};
	
	key = (event) => {if (event.keyCode === 32) {
		this.update(event);
	}};
	
	keyApply = (event) => {if (event.keyCode === 32) {
		this.applyPoints(event);
	}};
	
	keyInfo = (event, stat) => {if (event.keyCode === 32) {
		switch(stat) {
			default:
				break;
			case "str":
				this.setState({showStrInfo: true});
				break;
			case "dex":
				this.setState({showDexInfo: true});
				break;
			case "int":
				this.setState({showIntInfo: true});
				break;
			case "vit":
				this.setState({showVitInfo: true});
				break;
		}
	}};
	
	handleTooltipDismiss = (stat) => {
		switch(stat) {
			default:
				break;
			case "str":
				this.setState({showStrInfo: false});
				break;
			case "dex":
				this.setState({showDexInfo: false});
				break;
			case "int":
				this.setState({showIntInfo: false});
				break;
			case "vit":
				this.setState({showVitInfo: false});
				break;
		}
	};
	
	render() {
		return <div id="statisticsDiv">
			<div className="statsContainer">
				{this.props.allocate.allocate === true &&
					<div className="statMinus" data-stat={0} data-action={"-"} onClick={this.update} onKeyDown={this.key} aria-label="Decrease Strength" tabIndex="0">-</div>
				}
				<div className="statistics" id="statStr" data-stat="str" onClick={() => this.setState({showStrInfo: true})} onKeyDown={(event) => this.keyInfo(event, "str")} tabIndex="0">Strength: {this.props.stats.stat.strength}</div>
				{this.state.showStrInfo ? <StrInfo dismiss={this.handleTooltipDismiss}/> : null}
				{this.props.allocate.allocate === true &&
					<div className="statPlus" data-stat={0} data-action={"+"} onClick={this.update} onKeyDown={this.key} aria-label="Increase Strength" tabIndex="0">+</div>
				}
			</div>
			<div className="statsContainer">
				{this.props.allocate.allocate === true &&
					<div className="statMinus" data-stat={1} data-action={"-"} onClick={this.update} onKeyDown={this.key} aria-label="Decrease Dexterity" tabIndex="0">-</div>
				}
				<div className="statistics" id="statDex" data-stat="dex" onClick={() => this.setState({showDexInfo: true})} onKeyDown={(event) => this.keyInfo(event, "dex")} tabIndex="0">Dexterity: {this.props.stats.stat.dexterity}</div>
				{this.state.showDexInfo ? <DexInfo dismiss={this.handleTooltipDismiss}/> : null}
				{this.props.allocate.allocate === true &&
					<div className="statPlus" data-stat={1} data-action={"+"} onClick={this.update} onKeyDown={this.key} aria-label="Increase Dexterity" tabIndex="0">+</div>
				}
			</div>
			<div className="statsContainer">
				{this.props.allocate.allocate === true &&
					<div className="statMinus" data-stat={2} data-action={"-"} onClick={this.update} onKeyDown={this.key} aria-label="Decrease Intelligence" tabIndex="0">-</div>
				}
				<div className="statistics" id="statInt" data-stat="int" onClick={() => this.setState({showIntInfo: true})} onKeyDown={(event) => this.keyInfo(event, "int")} tabIndex="0">Intelligence: {this.props.stats.stat.intelligence}</div>
				{this.state.showIntInfo ? <IntInfo dismiss={this.handleTooltipDismiss}/> : null}
				{this.props.allocate.allocate === true &&
					<div className="statPlus" data-stat={2} data-action={"+"} onClick={this.update} onKeyDown={this.key} aria-label="Increase Intelligence" tabIndex="0">+</div>
				}
			</div>
			<div className="statsContainer">
				{this.props.allocate.allocate === true &&
					<div className="statMinus" data-stat={3} data-action={"-"} onClick={this.update} onKeyDown={this.key} aria-label="Decrease Vitality" tabIndex="0">-</div>
				}
				<div className="statistics" id="statVit" data-stat="vit" onClick={() => this.setState({showVitInfo: true})} onKeyDown={(event) => this.keyInfo(event, "vit")} tabIndex="0">Vitality: {this.props.stats.stat.vitality}</div>
				{this.state.showVitInfo ? <VitInfo dismiss={this.handleTooltipDismiss}/> : null}
				{this.props.allocate.allocate === true &&
					<div className="statPlus" data-stat={3} data-action={"+"} onClick={this.update} onKeyDown={this.key} aria-label="Increase Vitality" tabIndex="0">+</div>
				}
			</div>
			<div>
				{
					(() => {
						if (this.props.allocate.allocate === true && this.props.allocate.points > 0) {
							if (this.props.allocate.points === 1) {
								return <div id="pointsRemainingDiv">{this.props.allocate.points} point remaining</div>
							} else {
								return <div id="pointsRemainingDiv">{this.props.allocate.points} points remaining</div>
							}
						} else if (this.props.allocate.allocate === true && this.props.allocate.points === 0) {
							return <div id="applyPointsDiv" onClick={this.applyPoints} onKeyDown={this.keyApply} tabIndex="0">Apply Points</div>
						}
					})()
				}
			</div>
		</div>
	}
}

export default Statistics;