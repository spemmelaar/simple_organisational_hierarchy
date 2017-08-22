import React, { Component } from 'react'

class RenderPartialTree extends Component
{
  
  render() {

    var currentEmployee = this.props.tree[this.props.startID];

    var name = currentEmployee['name'];
    var underlings = currentEmployee['underlings'];
    
    var rows = [];
    var index = 0;

    underlings.forEach(
      (underling) => {

        rows.push(<RenderPartialTree tree={this.props.tree} startID={underling} key={index.toString()} />);
        index++;
      }
    );

    return (
      <ul>
        <li>
          {name}
          {rows}
        </li>
      </ul>
    );
  }
}

export default RenderPartialTree;