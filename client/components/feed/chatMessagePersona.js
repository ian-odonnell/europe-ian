import React from 'react';
import ReactDOM from 'react-dom';

export default (props) => {
  return (
    <td className="chatMessagePersona" rowSpan={props.rowcount}>
      <div className="personaName">
        <a href={props.persona.profileUrl}>{props.persona.name}</a></div>
      <div className="personaAvatar"><img src={props.persona.avatarUrl} /></div>
    </td>
  );
}
