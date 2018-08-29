import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Link } from 'react-router-dom';
import { onChange } from '../actions/index';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

const styleMap = {
  'FONTSIZE_10': {
    fontSize: 10,
  },
  'FONTSIZE_12': {
    fontSize: 12,
  },
  'FONTSIZE_14': {
    fontSize: 14,
  },
  'FONTCOLOR_red': {
    color: "red"
  },
  'FONTCOLOR_black': {
    color: "black"
  },
  'FONTCOLOR_blue': {
    color: "blue"
  },
  'ALIGN_center': { //zzzz
    textAlign: "center"
  },
  'ALIGN_left': { //zzzz
    float: "left"
  },
  'ALIGN_right': { //zzzz
    float: "right"
  },
};

class EditorContainer extends React.Component {

  _onBoldClick() {
    this.props.onChange(RichUtils.toggleInlineStyle(
      this.props.editorState,
      'BOLD'
    ));
  }

  _onItalicClick() {
    this.props.onChange(RichUtils.toggleInlineStyle(
      this.props.editorState,
      'ITALIC'
    ));
  }

  _onUnderlineClick() {
    this.props.onChange(RichUtils.toggleInlineStyle(
      this.props.editorState,
      'UNDERLINE'
    ));
  }

  _onFontSizeClick(e) {
    console.log(e.target.getAttribute("value"))
    let fontSize = e.target.getAttribute("value");
    this.props.onChange(RichUtils.toggleInlineStyle(
      this.props.editorState,
      'FONTSIZE_'+fontSize,
    ));
  }

  _onFontColorClick(e) {
    let fontColor = e.target.getAttribute("value");
    this.props.onChange(RichUtils.toggleInlineStyle(
      this.props.editorState,
      'FONTCOLOR_'+fontColor,
    ));
  }

  _onTextAlignClick(e) { //zzzz
    let textAlign = e.target.getAttribute("value");
    console.log(textAlign);
    this.props.onChange(RichUtils.toggleInlineStyle(
      this.props.editorState,
      'ALIGN_'+textAlign,
    ));
  }

  _createBulletPoints() {
    this.props.onChange(RichUtils.toggleBlockType(
      this.props.editorState,
      'unordered-list-item'
    ));
  }

  _createNumberPoints() {
    this.props.onChange(RichUtils.toggleBlockType(
      this.props.editorState,
      'ordered-list-item'
    ));
  }

  render() {
    return (
      <div className="content">
        <AppBar className="appbar" position='absolute'>
          <nav>
              <div className="nav-wrapper">
                <Link to='/'><i className="material-icons nav-icons">home</i></Link>
                <h1 className="header">Collab Docs</h1>
                <i className="material-icons nav-icons">save</i>
              </div>
          </nav>
          </AppBar>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="buttons">
          <Button variant='text' color='primary' onClick={this._onBoldClick.bind(this)}><i className='material-icons'>format_bold</i></Button>
          <Button variant='text' color='primary' onClick={this._onItalicClick.bind(this)}><i className='material-icons'>format_italic</i></Button>
          <Button variant='text' color='primary' onClick={this._onUnderlineClick.bind(this)}><i className='material-icons'>format_underlined</i></Button>
          <Button variant='text' color='primary' onClick={this._createBulletPoints.bind(this)}><i className='material-icons'>format_list_bulleted</i></Button>
          <Button variant='text' color='primary' onClick={this._createNumberPoints.bind(this)}><i className='material-icons'>format_list_numbered</i></Button>
          <div className="dropdown">
          <Button variant='text' color='primary'><i className='material-icons'>format_size</i></Button>
            <div className="dropdown-content">
              <a href="#" onClick={this._onFontSizeClick.bind(this)} value='10'>10</a>
              <a href="#" onClick={this._onFontSizeClick.bind(this)} value='12'>12</a>
              <a href="#" onClick={this._onFontSizeClick.bind(this)} value='14'>14</a>
            </div>
          </div>
          <div className="dropdown">
            <Button variant='text' color='primary'><i className='material-icons'>format_color_text</i></Button>
            <div className="dropdown-content">
              <a href="#" onClick={this._onFontColorClick.bind(this)} value='black'>black</a>
              <a href="#" onClick={this._onFontColorClick.bind(this)} value='red'>red</a>
              <a href="#" onClick={this._onFontColorClick.bind(this)} value='blue'>blue</a>
            </div>
          </div>
          <div className="dropdown">
            <Button variant='text' color='primary'><i className='material-icons'>format_align_justify</i></Button>
            <div className="dropdown-content">
              {/* //zzzz */}
              <a href="#" onClick={this._onTextAlignClick.bind(this)} value='center'><i className='material-icons'>format_align_center</i></a>
              <a href="#" onClick={this._onTextAlignClick.bind(this)} value='left'><i className='material-icons'>format_align_left</i></a>
              <a href="#" onClick={this._onTextAlignClick.bind(this)} value='right'><i className='material-icons'>format_align_right</i></a>
            </div>
          </div>
        </div>
        <div className='editor'>
          <Editor
            editorState = {this.props.editorState || EditorState.createEmpty()}
            onChange = {this.props.onChange}
            customStyleMap = {styleMap}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorState: state.editorState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (editorState) => {
      dispatch(onChange(editorState));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
