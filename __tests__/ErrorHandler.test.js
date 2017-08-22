import { checkEmployeeArrayValid, getError } from '../src/ErrorHandler';
import { EMP_ARRAY_ERROR, EMP_ARRAY_INCORRECT_FORMAT, EMP_ID_NAN, EMP_ID_NOT_UNIQUE, ERROR_ARRAY_INVALID, TOO_MANY_CHIEFS, INVALID_MANAGER_ID, EXCEPTION_DICT } from '../src/Constants/ExceptionErrors';
import { ID, MANAGER_ID, NAME } from '../src/Constants/Constants';

describe('Test getError',
    () => {
        test('getError returns empty string when non-error is passed to it', () => {
            var phoney_error = "phoney_error";

            expect(
                getError(phoney_error)
            ).toBe("");

        }
        );

        test('getError returns appropriate error message when error is passed to it', () => {
            var realError = 'emp_id_nan';
            var output = getError(realError);
            console.log(output);
            // console.log(EXCEPTION_DICT[realError]);
            // console.log(getError(realError));
            expect(
                getError(realError)
            ).toBe(EXCEPTION_DICT[realError]);
        }
        );
    }
);


describe('Test checkEmployeeArrayValid',
    () => {

        test('checkEmployeeArrayValid throws exception EMP_ARRAY_ERROR when array not passed as param', () => {

            expect( () => {
							var errorArray = 5;
            	checkEmployeeArrayValid(errorArray);
            }
            ).toThrowError(EMP_ARRAY_ERROR);

        }
        );


        test('checkEmployeeArrayValid throws exception EMP_ID_NAN when id is not in employee Dictionary', () => {

            var employeeData = [{
                name: 'Martin',
                id: 220,
                manager_id: 100
            },
                {
                    hello: 'Alan',
                    name: 100
                }];

            expect(() => {
                checkEmployeeArrayValid(employeeData);
            }).toThrowError(EMP_ID_NAN);

        }
        );

        test('checkEmployeeArrayValid throws exception EMP_ARRAY_INCORRECT_FORMAT when name is not in employee Dictionary', () => {

            var employeeData = [{
                name: 'Martin',
                id: 220,
                manager_id: 100
            },
                {
                    id: 440,
                    bye: 100
                }];

            expect(() => {
                checkEmployeeArrayValid(employeeData);
            }).toThrowError(EMP_ARRAY_INCORRECT_FORMAT);
        }
        );

        test('checkEmployeeArrayValid throws exception EMP_ARRAY_INCORRECT_FORMAT when name is not a string', () => {

            var employeeData = [{
                name: 'Martin',
                id: 220,
                manager_id: 100
            },
                {
                    name: 5,
                    id: 220
                }];

            expect(() => {
                checkEmployeeArrayValid(employeeData);
            }).toThrowError(EMP_ARRAY_INCORRECT_FORMAT);

        }
        );

        test('checkEmployeeArrayValid throws exception EMP_ID_NAN when id is not a number', () => {

            var employeeData = [{
                name: 'Martin',
                id: 220,
                manager_id: 100
            },
            {
                name: 'Jackie',
                id: 'Helga',
            }];

            expect(() => {
                checkEmployeeArrayValid(employeeData);
            }).toThrowError(EMP_ID_NAN);

        }
        );

        test('checkEmployeeArrayValid throws exception EMP_ID_NOT_UNIQUE when more than one employee has the same employee id', () => {

            var employeeData = [{
                name: 'Martin',
                id: 220,
                manager_id: 100
            },
            {
                name: 'Jackie',
                id: 220,
                manager_id: 302
            }];

            expect(() => {
                checkEmployeeArrayValid(employeeData);
            }).toThrowError(EMP_ID_NOT_UNIQUE);

        }
       );

        test('checkEmployeeArrayValid throws exception EMP_ID_NAN when manager id is not a number', () => {

            var employeeData = [{
                name: 'Martin',
                id: 220,
                manager_id: 100
            },
            {
                name: 'Jackie',
                id: 255,
                manager_id: 'frog'
            }];

            expect(() => {
                checkEmployeeArrayValid(employeeData);
            }).toThrowError(EMP_ID_NAN);

        }
       );

        test('checkEmployeeArrayValid throws exception TOO_MANY_CHIEFS when more than one employee has no manager id', () => {

            var employeeData = [
            {
                name: 'Martin',
                id: 220
            },
            {
                name: 'Jackie',
                id: 64,
                manager_id: 657
            },
            {
                name: 'Katie',
                id: 657
            },
            {
                name: 'Jackie',
                id: 68,
                manager_id: 657
            }
            ];

            expect(() => {
                checkEmployeeArrayValid(employeeData);
            }).toThrowError(TOO_MANY_CHIEFS);
       }
       );


        test('checkEmployeeArrayValid throws exception INVALID_MANAGER_ID when manager id is not an employee id', () => {

            var employeeData = [{
                name: 'Martin',
                id: 220,
                manager_id: 229
            },
            {
                name: 'Jackie',
                id: 64,
                manager_id: 228
            },
            {
                name: 'Trixie',
                id: 228
            }
            ];

            expect(() => {
                checkEmployeeArrayValid(employeeData);
            }).toThrowError(INVALID_MANAGER_ID);

        }
        );

        test('checkEmployeeArrayValid ', () => {

            var employeeData = [{
                name: 'Martin',
                id: 220,
                manager_id: 229
            },
            {
                name: 'Jackie',
                id: 229,
                manager_id: 228
            },
            {
                name: 'Trixie',
                id: 228
            },
            {
                name: 'John',
                id: 62,
                manager_id: 228
            }
            ];

            expect(
                checkEmployeeArrayValid(employeeData)
            ).toMatchObject(
								{

									220: {
										name: 'Martin',
										'underlings': []
									},
									229: {
										'name': 'Jackie',
										'underlings': [220]
									},
									228: { 
										'name': 'Trixie', 
										'underlings': [229, 62] 
									},
									62: {
										'name': 'John',
										'underlings': []
									},
									'ceo_id': 228
								}
            );
        }
      );

    }
);