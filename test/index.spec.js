var obd = require('../index.js');

describe('obd', function() {
	describe('obd.isValidLoad', function() {
		it('should return true for valid Engine load', function() {
			expect(obd.isValidLoad(50)).toBeTruthy();
		});
		it('should return false for Engine load < 0', function() {
			expect(obd.isValidLoad(-1)).toBeFalsy();
		});
		it('should return false for Engine load > 100', function() {
			expect(obd.isValidLoad(101)).toBeFalsy();
		});
	});
	describe('obd.isValidRPM', function() {
		it('should return true for valid RPM', function() {
			expect(obd.isValidRPM(50)).toBeTruthy();
		});
		it('should return false for RPM < 0', function() {
			expect(obd.isValidRPM(-1)).toBeFalsy();
		});
		it('should return false for RPM > 16383.75', function() {
			expect(obd.isValidRPM(16383.76)).toBeFalsy();
		});
	});
	describe('obd.isValidSpeed', function() {
		it('should return true for valid Speed', function() {
			expect(obd.isValidSpeed(50)).toBeTruthy();
		});
		it('should return false for Speed < 0', function() {
			expect(obd.isValidSpeed(-1)).toBeFalsy();
		});
		it('should return false for Speed > 255', function() {
			expect(obd.isValidSpeed(256)).toBeFalsy();
		});
	});
	describe('obd.isValidMAF', function() {
		it('should return true for valid MAF', function() {
			expect(obd.isValidMAF(50)).toBeTruthy();
		});
		it('should return false for MAF < 0', function() {
			expect(obd.isValidMAF(-1)).toBeFalsy();
		});
		it('should return false for MAF > 655.35', function() {
			expect(obd.isValidMAF(655.36)).toBeFalsy();
		});
	});
	describe('obd.hasValidLoad', function() {
		it('should return true for an object with valid Engine load', function() {
			expect(obd.hasValidLoad({load : 50})).toBeTruthy();
		});
		it('should return false for an object without Engine load', function() {
			expect(obd.hasValidLoad({})).toBeFalsy();
		});
		it('should return false for an object with invalid Engine load', function() {
			expect(obd.hasValidLoad({load : 101})).toBeFalsy();
		});
	});
	describe('obd.hasValidRPM', function() {
		it('should return true for an object with valid RPM', function() {
			expect(obd.hasValidRPM({rpm : 50})).toBeTruthy();
		});
		it('should return false for an object without RPM', function() {
			expect(obd.hasValidRPM({})).toBeFalsy();
		});
		it('should return false for an object with invalid RPM', function() {
			expect(obd.hasValidRPM({rpm : -101})).toBeFalsy();
		});
	});
	describe('obd.hasValidSpeed', function() {
		it('should return true for an object with valid Speed', function() {
			expect(obd.hasValidSpeed({speed : 50})).toBeTruthy();
		});
		it('should return false for an object without Speed', function() {
			expect(obd.hasValidSpeed({})).toBeFalsy();
		});
		it('should return false for an object with invalid Speed', function() {
			expect(obd.hasValidSpeed({speed : 256})).toBeFalsy();
		});
	});
	describe('obd.hasValidMAF', function() {
		it('should return true for an object with valid MAF', function() {
			expect(obd.hasValidMAF({maf : 50})).toBeTruthy();
		});
		it('should return false for an object without MAF', function() {
			expect(obd.hasValidMAF({})).toBeFalsy();
		});
		it('should return false for an object with invalid MAF', function() {
			expect(obd.hasValidMAF({maf : 700})).toBeFalsy();
		});
	});
	describe('obd.encodeLoad', function() {
		it('should return encoded Load for valid Load', function() {
			expect(obd.encodeLoad(50)).toEqual('410C7F');
		});
		it('should return empty string for invalid Load', function() {
			expect(obd.encodeLoad(101)).toEqual('');
		});
	});
	describe('obd.encodeRPM', function() {
		it('should return encoded RPM for a single digit RPM', function() {
			expect(obd.encodeRPM(3.75)).toEqual('4104000F');
		});
		it('should return encoded RPM for a two digit RPM', function() {
			expect(obd.encodeRPM(63.75)).toEqual('410400FF');
		});
		it('should return encoded RPM for a three digit RPM', function() {
			expect(obd.encodeRPM(64)).toEqual('41040100');
		});
		it('should return encoded RPM for a four digit RPM', function() {
			expect(obd.encodeRPM(4000)).toEqual('41043E80');
		});
		it('should return empty string for invalid RPM', function() {
			expect(obd.encodeRPM(-101)).toEqual('');
		});
	});
	describe('obd.encodeSpeed', function() {
		it('should return encoded Speed for valid Speed', function() {
			expect(obd.encodeSpeed(50)).toEqual('410D32');
		});
		it('should return empty string for invalid Speed', function() {
			expect(obd.encodeSpeed(256)).toEqual('');
		});
	});
	describe('obd.encodeMAF', function() {
		it('should return encoded Load for a single digit MAF', function() {
			expect(obd.encodeMAF(0.15)).toEqual('4110000F');
		});
		it('should return encoded Load for a two digit MAF', function() {
			expect(obd.encodeMAF(2.55)).toEqual('411000FF');
		});
		it('should return encoded Load for a three digit MAF', function() {
			expect(obd.encodeMAF(2.56)).toEqual('41100100');
		});
		it('should return empty string for four digit invalid MAF', function() {
			expect(obd.encodeMAF(655.35)).toEqual('');
		});
		it('should return empty string for invalid MAF', function() {
			expect(obd.encodeMAF(-101)).toEqual('');
		});
	});
	describe('obd.encodeOBD', function() {
		it('should return encoded OBD array for valid OBD object', function() {
			var obdObject = {
				load : 60,
				rpm : 2048,
				speed : 128,
				maf : 500
			};
			var obdArray = ['410C99', '41042000', '410D80', '4110C350'];
			expect(obd.encodeOBD(obdObject)).toEqual(obdArray);
		});
		it('should return encoded OBD array for Valid and Invalid parameters', function() {
			var obdObject = {
				load : 60,
				RPM : 2048,
				speed : 128,
				MAF : 500
			};
			var obdArray = ['410C99', '410D80'];
			expect(obd.encodeOBD(obdObject)).toEqual(obdArray);
		});
		it('should return encoded OBD array for invalid OBD object', function() {
			var obdObject = {
				RPM : 60
			};
			var obdArray = [];
			expect(obd.encodeOBD(obdObject)).toEqual(obdArray);
		});
	});
	describe('obd.decodeOBD', function() {
		it('should decode obd load', function() {
			expect(obd.decodeOBD('410C99')).toEqual(60);
		});
		it('should decode obd RPM', function() {
			expect(obd.decodeOBD('41040800')).toEqual(512);
		});
		it('should decode obd speed', function() {
			expect(obd.decodeOBD('410D80')).toEqual(128);
		});
		it('should decode obd MAF', function() {
			expect(obd.decodeOBD('411001F4')).toEqual(5);
		});
		it('should decode invalid obd', function() {
			expect(obd.decodeOBD('411101F4')).toEqual(null);
		});
		it('should return decoded OBD object for valid OBD array', function() {
			var obdArray = ['410C99', '41040800', '410D80', '411001F4'];
			var obdObject = {
				load : 60,
				rpm : 512,
				speed : 128,
				maf : 5
			};
			expect(obd.decodeOBD(obdArray)).toEqual(obdObject);
		});
		it('should return decoded OBD object for Valid and Invalid parameters', function() {
			var obdArray = ['410C99', '41040800', '410D80', '411101F4'];
			var obdObject = {
				load : 60,
				rpm : 512,
				speed : 128
			};
			expect(obd.decodeOBD(obdArray)).toEqual(obdObject);
		});
		it('should return empty OBD Object for invalid OBD Array', function() {
			var obdArray = ['411D80'];
			var obdObject = {};
			expect(obd.decodeOBD(obdArray)).toEqual(obdObject);
		});
		it('should return empty OBD Object for empty OBD Array', function() {
			var obdArray = [];
			var obdObject = {};
			expect(obd.decodeOBD(obdArray)).toEqual(obdObject);
		});
		it('should decode invalid input', function() {
			expect(obd.decodeOBD({})).toEqual({});
		});
	});
});
