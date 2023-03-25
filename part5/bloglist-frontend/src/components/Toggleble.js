import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Toggleble = forwardRef(function Toggleble (props, refs) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '', margin:12 };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} id='form-create-btn'>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Toggleble.propTypes = {
  buttonLabel: PropTypes.string,
  children: PropTypes.object,
};

export default Toggleble;
