// Copyright 2020-2023, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
import massesAndSpringsBasics from './massesAndSpringsBasics.js';

type StringsType = {
  'centerOfOscillation': string;
  'centerOfOscillationStringProperty': LocalizedStringProperty;
  'masses-and-springs-basics': {
    'title': string;
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'stretch': string;
    'stretchStringProperty': LocalizedStringProperty;
    'bounce': string;
    'bounceStringProperty': LocalizedStringProperty;
    'lab': string;
    'labStringProperty': LocalizedStringProperty;
  };
  'restingPosition': string;
  'restingPositionStringProperty': LocalizedStringProperty;
  'unstretchedLength': string;
  'unstretchedLengthStringProperty': LocalizedStringProperty;
};

const MassesAndSpringsBasicsStrings = getStringModule( 'MASSES_AND_SPRINGS_BASICS' ) as StringsType;

massesAndSpringsBasics.register( 'MassesAndSpringsBasicsStrings', MassesAndSpringsBasicsStrings );

export default MassesAndSpringsBasicsStrings;
