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
  'centerOfOscillationStringProperty': TReadOnlyProperty<string>;
  'masses-and-springs-basics': {
    'title': string;
    'titleStringProperty': TReadOnlyProperty<string>;
  };
  'screen': {
    'stretch': string;
    'stretchStringProperty': TReadOnlyProperty<string>;
    'bounce': string;
    'bounceStringProperty': TReadOnlyProperty<string>;
    'lab': string;
    'labStringProperty': TReadOnlyProperty<string>;
  };
  'restingPosition': string;
  'restingPositionStringProperty': TReadOnlyProperty<string>;
  'unstretchedLength': string;
  'unstretchedLengthStringProperty': TReadOnlyProperty<string>;
};

const MassesAndSpringsBasicsStrings = getStringModule( 'MASSES_AND_SPRINGS_BASICS' ) as StringsType;

massesAndSpringsBasics.register( 'MassesAndSpringsBasicsStrings', MassesAndSpringsBasicsStrings );

export default MassesAndSpringsBasicsStrings;
