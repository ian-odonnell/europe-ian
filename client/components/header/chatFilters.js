import React from 'react';
import ReactDOM from 'react-dom';
import ChatFilterButton from './chatFilterButton';

export default (props) => {
  let buttons = [];
  buttons.push(<ChatFilterButton key={1} filterName='wow' buttonLabel='World of Warcraft' showMessages={props.filters.showWow} changeFilter={props.changeFilter} />);
  buttons.push(<ChatFilterButton key={2} filterName='diablo' buttonLabel='Diablo' showMessages={props.filters.showDiablo} changeFilter={props.changeFilter} />);
  buttons.push(<ChatFilterButton key={3} filterName='overwatch' buttonLabel='Overwatch' showMessages={props.filters.showOverwatch} changeFilter={props.changeFilter} />);
  buttons.push(<ChatFilterButton key={4} filterName='steam' buttonLabel='Steam' showMessages={props.filters.showSteam} changeFilter={props.changeFilter} />);

  return (
    <div className="chatFilters">
      <table>
        <tbody>
          <tr>
            {buttons}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
