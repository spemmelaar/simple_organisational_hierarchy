import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import HierarchyRoot from './HierarchyRoot';
import employeeData from './Constants/EmployeeData';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HierarchyRoot employeeData={employeeData} />, document.getElementById('root'));
registerServiceWorker();
