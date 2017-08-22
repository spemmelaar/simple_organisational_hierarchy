import React, { Component } from 'react'
import { checkEmployeeArrayValid, getError } from './ErrorHandler';
import RenderPartialTree from './RenderPartialTree';

function ValidatationChecks(props) {

    //Basic error checking before we traverse the nodes.
    try {

        var hierarchy = checkEmployeeArrayValid(props.employeeData);
        var ceoID = hierarchy['ceo_id'];
          return (
            <RenderPartialTree tree={hierarchy} startID={ceoID} />
          );


    } catch ( error ) {
      
      var errorText = getError(error.message);

      if( errorText === "") {
        errorText = "An Error Occured";
      }

      return (
        <div  className="error">
          {errorText}
        </div>
      );
  }

}

class HierarchyRoot extends Component {

  render() {


    return (
      <ValidatationChecks employeeData={this.props.employeeData} />
    );
  }
}

export default HierarchyRoot;
