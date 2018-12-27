import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { createSelector, createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
// Localize
import { renderToStaticMarkup } from 'react-dom/server';
import { withLocalize, Translate } from 'react-localize-redux';
// UI
import { Jumbotron, ButtonGroup, Button } from 'reactstrap';
// Constants
import APP from './actions/types';
import CONSTANTS from './constants';
import config from './constants/config';
// Services
import createAction from './actions/createAction';
// System
import Head from './components/system/Head';
// Styles
import './styles/main.scss';

class App extends Component {
  componentDidMount() {
    const {
      initialize,
    } = this.props;

    initialize({
      // An array of languages your translations will support.
      languages: [
        { name: CONSTANTS.ENGLISH, code: CONSTANTS.EN },
        { name: CONSTANTS.ARABIC, code: CONSTANTS.AR },
      ],
      // Translation data in all languages or single language format.
      // translation: {},
      options: {
        renderToStaticMarkup, // renderToStaticMarkup {Function} - Default (boolean)
        // renderInnerHtml {Boolean} - Default (false)
        // onMissingTranslation {Function} - Default (returns default missing message)
        // defaultLanguage {String} Default (languages[0])
        // ignoreTranslateChildren {Boolean} - Default (false)
      },
    });
  }

  changeDirection = () => {
    const { dir, setDirection } = this.props;
    const direction = dir === CONSTANTS.RTL ? CONSTANTS.LTR : CONSTANTS.RTL;

    setDirection(direction);
  };

  changeLang = () => {
    const {
      activeLanguage,
      setLanguage,
    } = this.props;

    const lang = get(activeLanguage, 'code') === CONSTANTS.EN ? CONSTANTS.AR : CONSTANTS.EN;

    setLanguage(lang);
  };

  render() {
    const { lang, dir } = this.props;

    return (
      <>
        <Head
          htmlAttributes={{ dir, lang }}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={
              () => (<Jumbotron>
                <h1>
                  <Translate id="APP" />
                </h1>
              </Jumbotron>)
            }
          />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
        {
          config.DEBUG && (
            <ButtonGroup className="temp-controls" dir="rtl">
              <Button color="primary" className="rounded-0" onClick={this.changeDirection}>Change direction</Button>
              <Button color="success" className="rounded-0" onClick={this.changeLang}>Change lang</Button>
            </ButtonGroup>
          )
        }
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dir: createSelector(state => state, state => state.app.direction),
  lang: createSelector(state => state, state => state.app.language),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setDirection: createAction(APP.SET_DIRECTION),
    setLanguage: createAction(APP.LANGUAGE.START),
  },
  dispatch,
);

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(App));
