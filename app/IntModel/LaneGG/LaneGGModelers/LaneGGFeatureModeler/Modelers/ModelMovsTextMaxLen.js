
/***********************************************************************************
	Would model movements' max text length (unit included if any) in
	current laneGG. Number length would its parsed string length.

	Would update:
		laneGGFeatureGeo.movsTextMaxLen =  {
			volume: xxx, //max volume length in current laneGG
			delay: xxx,  //max delay length in current laneGG
			stop: xxx,   //max stop length in current laneGG
			queue: xxx,  //max queue length in current laneGG
			overflow: xxx,  //max overflow length in current laneGG
		}
************************************************************************************/
const modelMovsTextMaxLen = (laneGG) => {
	const volumeLens = [];
	const delayLens = [];
	const stopLens = [];
	const queueLens = [];
	const overflowLens = [];

	const movements = laneGG.movements;
	movements.forEach((oneMov) => {
		let oneMovVol = (oneMov.volume !== null) ? oneMov.volume : "";
		oneMovVol += oneMov.volumeUnit;
		volumeLens.push(oneMovVol.length);

		let oneMovDelay = (oneMov.delay !== null) ? oneMov.delay : "";
		oneMovDelay += oneMov.delayUnit;
		delayLens.push(oneMovDelay.length);

		let oneMovStop = (oneMov.stop !== null) ? oneMov.stop : "";
		oneMovStop += oneMov.stopUnit;
		stopLens.push(oneMovStop.length);

		let oneMovQueue = (oneMov.queue !== null) ? oneMov.queue : "";
		oneMovQueue += oneMov.queueUnit;
		queueLens.push(oneMovQueue.length);

		let oneMovOverflow = (oneMov.overflow !== null) ? oneMov.overflow : "";
		oneMovOverflow += oneMov.overflowUnit;
		overflowLens.push(oneMovOverflow.length);
	});


	//do update:
	laneGG.laneGGFeatureGeo.movsTextMaxLen =  {
		volume: Math.max(...volumeLens), //max volume length in current laneGG
		delay: Math.max(...delayLens),  //max delay length in current laneGG
		stop: Math.max(...stopLens),   //max stop length in current laneGG
		queue: Math.max(...queueLens),  //max queue length in current laneGG
		overflow: Math.max(...overflowLens),  //max overflow length in current laneGG
	};

};


export default modelMovsTextMaxLen;
