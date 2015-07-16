var obd = obd || {};

var hexString = function(dec, length) {
	var str = dec.toString(16).toUpperCase();
	return (Array(length + 1).join('0') + str).substring(str.length);
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
	return '4104' + hexString(rpm, 4);
};

var convertSpeed = function(speed) {
	return '410D' + hexString(speed, 2);
};

var convertMAF = function(maf) {
	return '4110' + hexString(maf, 4);
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

module.exports = obd;
