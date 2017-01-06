var obd = obd || {};

var hexString = function(dec, length) {
	var str = dec.toString(16).toUpperCase();
	return (Array(length + 1).join('0') + str).substring(str.length);
};

var parseHex = function(string) {
	return parseInt(string, 16);
};

obd.isValidLoad = function(load) {
	return ((load > 0) && (load < 100));
};

obd.isValidRPM = function(rpm) {
	return ((rpm > 0) && (rpm < 16383.75));
};

obd.isValidSpeed = function(speed) {
	return ((speed > 0) && (speed < 255));
};

obd.isValidMAF = function(maf) {
	return ((maf > 0) && (maf < 655.35));
};

obd.hasValidLoad = function(obdObject) {
	if (obdObject.hasOwnProperty('load')) {
		return obd.isValidLoad(obdObject.load);
	} else {
		return false;
	}
};

obd.hasValidRPM = function(obdObject) {
	if (obdObject.hasOwnProperty('rpm')) {
		return obd.isValidRPM(obdObject.rpm);
	} else {
		return false;
	}
};

obd.hasValidSpeed = function(obdObject) {
	if (obdObject.hasOwnProperty('speed')) {
		return obd.isValidSpeed(obdObject.speed);
	} else {
		return false;
	}
};

obd.hasValidMAF = function(obdObject) {
	if (obdObject.hasOwnProperty('maf')) {
		return obd.isValidMAF(obdObject.maf);
	} else {
		return false;
	}
};

var convertLoad = function(load) {
	return '410C' + hexString(Math.floor(load * 255 / 100), 2);
};

var convertRPM = function(rpm) {
	return '4104' + hexString(rpm * 4, 4);
};

var convertSpeed = function(speed) {
	return '410D' + hexString(speed, 2);
};

var convertMAF = function(maf) {
	return '4110' + hexString(Math.round(maf * 100), 4);
};

var decodeLoad = function(string) {
	return parseHex(string.substring(0, 2)) * 100 / 255;
};

var decodeRPM = function(string) {
	return parseHex(string.substring(0, 4)) / 4;
};

var decodeSpeed = function(string) {
	return parseHex(string.substring(0, 2));
};

var decodeMAF = function(string) {
	return parseHex(string.substring(0, 4)) / 100;
};

obd.encodeLoad = function(load) {
	if (obd.isValidLoad(load)) {
		return convertLoad(load);
	} else {
		return '';
	}
};

obd.encodeRPM = function(rpm) {
	if (obd.isValidRPM(rpm)) {
		return convertRPM(rpm);
	} else {
		return '';
	}
};

obd.encodeSpeed = function(speed) {
	if (obd.isValidSpeed(speed)) {
		return convertSpeed(speed);
	} else {
		return '';
	}
};

obd.encodeMAF = function(maf) {
	if (obd.isValidMAF(maf)) {
		return convertMAF(maf);
	} else {
		return '';
	}
};

obd.encodeOBD = function(obdObject) {
	var encodedObd = [];
	if (obd.hasValidLoad(obdObject)) {
		encodedObd.push(convertLoad(obdObject.load));
	}
	if (obd.hasValidRPM(obdObject)) {
		encodedObd.push(convertRPM(obdObject.rpm));
	}
	if (obd.hasValidSpeed(obdObject)) {
		encodedObd.push(convertSpeed(obdObject.speed));
	}
	if (obd.hasValidMAF(obdObject)) {
		encodedObd.push(convertMAF(obdObject.maf));
	}
	return encodedObd;
};

obd.decodeOBDString = function(obd) {
	var decodedObd = null;
	var obdData;
	if (typeof obd === 'string') {
		obdData = obd.substring(4, obd.length);
		switch (obd.substring(0, 4)) {
			case '410C':
				decodedObd = decodeLoad(obdData);
				break;
			case '4104':
				decodedObd = decodeRPM(obdData);
				break;
			case '410D':
				decodedObd = decodeSpeed(obdData);
				break;
			case '4110':
				decodedObd = decodeMAF(obdData);
				break;
			default :
				decodedObd = null;
				break;
		}
	}
	return decodedObd;
};

obd.decodeOBDArray = function(encodedObd) {
	if (encodedObd.length <= 0) {
		return {};
	} else {
		for (var i = 0; i < encodedObd.length; i += 1) {
			obdData = encodedObd[i].substring(4, encodedObd[i].length);
			switch (encodedObd[i].substring(0, 4)) {
				case '410C':
					decodedObd.load = decodeLoad(obdData);
					break;
				case '4104':
					decodedObd.rpm = decodeRPM(obdData);
					break;
				case '410D':
					decodedObd.speed = decodeSpeed(obdData);
					break;
				case '4110':
					decodedObd.maf = decodeMAF(obdData);
					break;
				default :
					break;
			}
		}
		return decodedObd;
	}
};

obd.decodeOBD = function(encodedObd) {
	var decodedObd;
	var obdData;
	if (typeof encodedObd === 'string') {
		decodedObd = obd.decodeOBDString(encodedObd);
	} else if (encodedObd instanceof Array) {
		decodedObd = obd.decodeOBDArray(encodedObd);
	}
	return decodedObd;
};

module.exports = obd;
