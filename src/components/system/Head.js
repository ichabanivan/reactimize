import React, { Component } from 'react';
import { get } from 'lodash';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

class Head extends Component {
  render() {
    const {
      customSEO,
      entitySEO,
      pageSEO,
      defaultSEO,
      htmlAttributes,
    } = this.props;

    const seoInformation = {
      seoTitle: get(customSEO, 'seoTitle') || get(entitySEO, 'seoTitle') || get(pageSEO, 'seoTitle') || get(defaultSEO, 'seoTitle'),
      seoDescription: get(customSEO, 'seoDescription') || get(entitySEO, 'seoDescription') || get(pageSEO, 'seoDescription') || get(defaultSEO, 'seoDescription'),
      seoKeywords: get(customSEO, 'seoKeywords') || get(entitySEO, 'seoKeywords') || get(pageSEO, 'seoKeywords') || get(defaultSEO, 'seoKeywords'),
      image: get(customSEO, 'image') || get(entitySEO, 'image') || get(pageSEO, 'image') || get(defaultSEO, 'image'),
    };

    // console.log('%c seoInformation => ( lang ) ', 'background-color: #4a7eb1; color: #fff; font-size: 12px;',
    //   '\n seoInformation:', seoInformation,
    //   '\n customSEO:', customSEO,
    //   '\n entitySEO:', entitySEO,
    //   '\n pageSEO:', pageSEO,
    //   '\n defaultSEO:', defaultSEO,
    // );

    return (<Helmet
      htmlAttributes={htmlAttributes}
      title={get(seoInformation, 'seoTitle')}
      meta={[
        { charset: 'utf-8' },
        { name: 'description', content: get(seoInformation, 'seoDescription') },
        { rel: 'canonical', href: window.location.href },
        { name: 'keywords', content: get(seoInformation, 'seoKeywords', '') },
        // For Facebook and Google
        { property: 'og:title', content: get(seoInformation, 'seoTitle') },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: get(seoInformation, ['image', 'imageUrl']) },
        { property: 'og:description', content: get(seoInformation, 'seoDescription') },
        { property: 'og:locale', content: 'en_EN' },
        { property: 'og:site_name', content: 'CBC Drama' },
        { property: 'og:image:width', content: '968' },
        { property: 'og:image:height', content: '504' },
        // For Twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: get(seoInformation, 'seoTitle') },
        { name: 'twitter:description', content: get(seoInformation, 'seoDescription') },
        { name: 'twitter:image:src', content: get(seoInformation, ['image', 'imageUrl']) },
        { name: 'twitter:url', content: window.location.href },
        { name: 'twitter:site', content: '@cbcdrama' },
        { name: 'twitter:creator', content: '@cbcdrama' },
      ]}
    />);
  }
}

const mapStateToProps = createStructuredSelector({
  pageSEO: createSelector(state => state, state => state.app.pageSEO),
  entitySEO: createSelector(state => state, state => state.app.entitySEO),
  customSEO: createSelector(state => state, state => state.app.customSEO),
  defaultSEO: createSelector(state => state, state => state.app.defaultSEO),
});

export default connect(mapStateToProps, {})(Head);
