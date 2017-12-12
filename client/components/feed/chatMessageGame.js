import React from 'react';
import ReactDOM from 'react-dom';

export default (props) => {
  return (
    <td className="chatMessageGame" rowSpan={props.rowcount}>
      <img src={props.game.logoUrl} />
    </td>
  );
}
