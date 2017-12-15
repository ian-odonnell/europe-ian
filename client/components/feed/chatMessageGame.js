import React from 'react';

export default (props) => {
  return (
    <td className="chatMessageGame" rowSpan={props.rowcount}>
      <img src={props.game.logoUrl} />
    </td>
  );
}
