// Copyright 2020-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import massesAndSpringsBasics from './massesAndSpringsBasics.js';

type StringsType = {
  'centerOfOscillation': string;
  'centerOfOscillationProperty': TReadOnlyProperty<string>;
  'masses-and-springs-basics': {
    'title': string;
    'titleProperty': TReadOnlyProperty<string>;
  };
  'screen': {
    'stretch': string;
    'stretchProperty': TReadOnlyProperty<string>;
    'bounce': string;
    'bounceProperty': TReadOnlyProperty<string>;
    'lab': string;
    'labProperty': TReadOnlyProperty<string>;
  };
  'restingPosition': string;
  'restingPositionProperty': TReadOnlyProperty<string>;
  'unstretchedLength': string;
  'unstretchedLengthProperty': TReadOnlyProperty<string>;
};

const massesAndSpringsBasicsStrings = getStringModule( 'MASSES_AND_SPRINGS_BASICS' ) as StringsType;

massesAndSpringsBasics.register( 'massesAndSpringsBasicsStrings', massesAndSpringsBasicsStrings );

export default massesAndSpringsBasicsStrings;
