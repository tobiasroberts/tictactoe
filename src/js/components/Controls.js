import React from 'react';
import { ActionCreators } from 'redux-undo';
import { connect } from 'react-redux';

const Controls = ({allowUndo, allowReset, allowRedo, undo, reset, redo}) => (
  <div className="controls">
    <button className="undo" onClick={undo} disabled={!allowUndo}></button>
    <button className="reset" onClick={reset} disabled={!allowReset}></button>
    <button className="redo" onClick={redo} disabled={!allowRedo}></button>
  </div>
);

const mapStateToProps = state => {
  return {
    allowUndo: state.past.length > 0,
    allowReset: state.past.length > 0,
    allowRedo: state.future.length > 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    undo: () => dispatch(ActionCreators.undo()),
    reset: () => dispatch(ActionCreators.jumpToPast(0)) && dispatch(ActionCreators.clearHistory()),
    redo: () => dispatch(ActionCreators.redo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
