const CYCLIC_HIERARCHY = 'cyclic_hierarchy';
const EMP_ARRAY_ERROR = 'employee_array_error';
const EMP_ARRAY_INCORRECT_FORMAT = 'employee_array_incorrect_format';
const EMP_ID_NAN = 'emp_id_nan';
const EMP_ID_NOT_UNIQUE = 'emp_id_not_unique';
const ERROR_ARRAY_INVALID = 'error_array_invalid';
const TOO_MANY_CHIEFS = 'ceo_gt_one';
const INVALID_MANAGER_ID = 'invalid_manager_id';

const EXCEPTION_DICT = {
		'cyclic_hierarchy': 'Hierarchy is not a tree. It contains cycles',
        'employee_array_error': 'Employee Array is not an array.',
        'employee_array_incorrect_format': 'Employee Array entries not formatted correctly.',
        'emp_id_nan': 'ID is not a number.',
        'emp_id_not_unique': 'Employee ID is not unique',
        'error_array_invalid': 'Error Array is not valid',
        'ceo_gt_one': 'There must only be one CEO.',
        'invalid_manager_id': 'Manager ID is not an Employee ID.'
};

export { CYCLIC_HIERARCHY, EMP_ARRAY_ERROR, EMP_ARRAY_INCORRECT_FORMAT, EMP_ID_NAN, EMP_ID_NOT_UNIQUE, ERROR_ARRAY_INVALID, TOO_MANY_CHIEFS, INVALID_MANAGER_ID, EXCEPTION_DICT };