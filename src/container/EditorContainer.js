import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { NavLink } from 'react-router-dom';
import * as actions from '../actions/index';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

const styleMap = {
  'FONTSIZE_8': {
    fontSize: 8,
  },
  'FONTSIZE_12': {
    fontSize: 12,
  },
  'FONTSIZE_14': {
    fontSize: 14,
  },
  'FONTSIZE_24': {
    fontSize: 24,
  },
  'FONTSIZE_14': {
    fontSize: 36,
  },
  'FONTSIZE_42': {
    fontSize: 42,
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
  'FONTCOLOR_green': {
    color: "green"
  },
  'FONTCOLOR_lightblue': {
    color: "lightblue"
  },
  'FONTCOLOR_white': {
    color: "white"
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
      <div>
        {
          this.props.loggedIn
          ? <div className="content">
            <AppBar className="appbar" position='absolute'>
              <nav>
                  <div className="nav-wrapper">
                    <div>
                      <NavLink to='/documents' style={{textDecoration: 'none'}}>
                        <i className="material-icons nav-icons">
                          view_list
                        </i>
                      </NavLink>
                      <div className="dropdown">
                        <i className='material-icons nav-icons'>person_pin</i>
                        <div className="dropdown-content">
                          <a href="#">{this.props.user.username}</a>
                        </div>
                      </div>
                    </div>

                    <h1 className="header">Collab Docs</h1>
                    <Button onClick={() => this.props.saveDoc(this.props.editorState, this.props.currentDocId)}>
                    <i className="material-icons nav-icons">save</i>
                  </Button>
                  </div>
              </nav>
              </AppBar>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className='page-backdrop'>
              <div className="buttons">
                <Button variant='text' color='primary' onClick={this._onBoldClick.bind(this)}><i className='material-icons'>format_bold</i></Button>
                <Button variant='text' color='primary' onClick={this._onItalicClick.bind(this)}><i className='material-icons'>format_italic</i></Button>
                <Button variant='text' color='primary' onClick={this._onUnderlineClick.bind(this)}><i className='material-icons'>format_underlined</i></Button>
                <Button variant='text' color='primary' onClick={this._createBulletPoints.bind(this)}><i className='material-icons'>format_list_bulleted</i></Button>
                <Button variant='text' color='primary' onClick={this._createNumberPoints.bind(this)}><i className='material-icons'>format_list_numbered</i></Button>
                <div className="dropdown">
                <Button variant='text' color='primary'><i className='material-icons'>format_size</i></Button>
                  <div className="dropdown-content">
                    <a href="#" onClick={this._onFontSizeClick.bind(this)} value='8'>8</a>
                    <a href="#" onClick={this._onFontSizeClick.bind(this)} value='12'>12</a>
                    <a href="#" onClick={this._onFontSizeClick.bind(this)} value='14'>14</a>
                    <a href="#" onClick={this._onFontSizeClick.bind(this)} value='24'>24</a>
                    <a href="#" onClick={this._onFontSizeClick.bind(this)} value='36'>36</a>
                    <a href="#" onClick={this._onFontSizeClick.bind(this)} value='42'>42</a>
                  </div>
                </div>
                <div className="dropdown">
                  <Button variant='text' color='primary'><i className='material-icons'>format_color_text</i></Button>
                  <div className="dropdown-content">
                    <a href="#" onClick={this._onFontColorClick.bind(this)} value='black'>black</a>
                    <a href="#" onClick={this._onFontColorClick.bind(this)} value='red'>red</a>
                    <a href="#" onClick={this._onFontColorClick.bind(this)} value='blue'>blue</a>
                    <a href="#" onClick={this._onFontColorClick.bind(this)} value='green'>green</a>
                    <a href="#" onClick={this._onFontColorClick.bind(this)} value='lightblue'>lightblue</a>
                    <a href="#" onClick={this._onFontColorClick.bind(this)} value='white'>white</a>
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
          </div>
          : <Redirect to='/'/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorState: state.editorState,
    user: state.user,
    loggedIn: state.loggedIn,
    currentDocId: state.currentDocId,
  };
};

export default connect(mapStateToProps, actions)(EditorContainer);
