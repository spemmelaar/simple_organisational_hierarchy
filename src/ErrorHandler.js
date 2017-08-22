import { EMP_ARRAY_ERROR, EMP_ARRAY_INCORRECT_FORMAT, EMP_ID_NAN, EMP_ID_NOT_UNIQUE, EXCEPTION_DICT, INVALID_MANAGER_ID, TOO_MANY_CHIEFS, CYCLIC_HIERARCHY } from './Constants/ExceptionErrors';
import { ID, MANAGER_ID, NAME } from './Constants/Constants';

/**
 * Gets the error from the exception dictionary.
 * @param  {string} error_key The error code.
 * @return {string} The full text of the error or an empty string if error not in dictionary.
 */
function getError(error_key) {
    

	if (typeof EXCEPTION_DICT[error_key] === "undefined") {

		return "";
	}
	return EXCEPTION_DICT[error_key];
}

/**
 * Checks all employee id values to ensure they are numerical.
 * @param  {Array} employeeArray Array containing dictionaries of employee data.
 * @return {Object}  Return an object containing objects with keys for employee id and values containing.
 * an object with that employee's name and an id listing of their subordinates who report to that employee as manager.
 */
function checkEmployeeArrayValid(employeeArray) {

    var nodesWithoutManagers = [];
    var employeeIdArray = [];
    var managerIdArray = [];

    var outputObject = {};

    if (Array.isArray(employeeArray) === false) {
        throw new TypeError(EMP_ARRAY_ERROR);
    }

    employeeArray.forEach(function(employee) {

        if (typeof employee === "undefined")
            throw new TypeError(EMP_ARRAY_INCORRECT_FORMAT);

        if (typeof employee[ID] !== "number")
            throw new TypeError(EMP_ID_NAN);

        if (typeof employee[NAME] !== "string")
            throw new TypeError(EMP_ARRAY_INCORRECT_FORMAT);

        if (employeeIdArray.includes(employee[ID])) {
            throw new Error(EMP_ID_NOT_UNIQUE);
        }

        employeeIdArray.push(employee[ID]);

        if (typeof employee[MANAGER_ID] === "undefined") {
            nodesWithoutManagers.push(employee);

        } else {

            if (typeof employee[MANAGER_ID] !== "number") {
                throw new TypeError(EMP_ID_NAN);

            } else {
                managerIdArray.push(employee[MANAGER_ID]);
            }

        }

        //=====Build tree structure for output=====

        if (typeof outputObject[employee[ID]] === "undefined") {
        	outputObject[employee[ID]] =  {"name": employee[NAME] , "underlings": [] };
 

        	if(typeof employee[MANAGER_ID] !== "undefined") {
	        	if (typeof outputObject[employee[MANAGER_ID]] === "undefined") {
	
		    			outputObject[employee[MANAGER_ID]] = { "underlings": [] };
	

	        	}

	    		outputObject[employee[MANAGER_ID]]["underlings"].push(employee[ID]);
        	}
        	
        } else {
        	outputObject[employee[ID]][NAME] = employee[NAME];
 
        	if (typeof employee[MANAGER_ID] !== "undefined") {

        		if(typeof outputObject[employee[MANAGER_ID]] === "undefined" ) {
        			outputObject[employee[MANAGER_ID]] = { "underlings": [] };

        		} 
        		
        		outputObject[employee[MANAGER_ID]]['underlings'].push(employee[ID]);

        	}   	
        }
      
    }
    );

    //There can only be one root node in the hierarchy.
    if (nodesWithoutManagers.length > 1) {
        throw new Error(TOO_MANY_CHIEFS);
    }

    //Every manager id in the list must be an employee in the list.
    managerIdArray.forEach(
        (managerId) => {

            if (employeeIdArray.includes(managerId) === false) {
                throw new Error(INVALID_MANAGER_ID);
            }

        }
    );

    //Hierarchy is not tree structure - contains a cycle.
    if (nodesWithoutManagers.length === 0) {
        throw new Error(CYCLIC_HIERARCHY);
    }

    outputObject['ceo_id'] = nodesWithoutManagers[0][ID];
    return outputObject;
}

export { checkEmployeeArrayValid, getError }