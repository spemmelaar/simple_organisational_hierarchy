import React, { Component } from 'react';

class Validation {
	const ERROR_NO_CEO_ID = 0;
	const ERROR_CEO_GT_ONE = 1;
	

	const ERROR_CODE_DICT = {
		ERROR_NO_CEO_ID : "No CEO ID",
		ERROR_CEO_GT_ONE : "More than one CEO",
	}
	

	var validateId = function(employeeId, errorMessage) {
		
		if employeeId.isNan() {
			return employeeId;
		} else {

		}
	}

	var validateCeoId(ceoId)

}

export default Validation;