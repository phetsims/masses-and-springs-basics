// Copyright 2018, University of Colorado Boulder

/**
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var MassesAndSpringsBasicsModel = require( 'MASSES_AND_SPRINGS_BASICS/masses-and-springs-basics/model/MassesAndSpringsBasicsModel' );
  var MassesAndSpringsBasicsScreenView = require( 'MASSES_AND_SPRINGS_BASICS/masses-and-springs-basics/view/MassesAndSpringsBasicsScreenView' );

  /**
   * @constructor
   */
  function MassesAndSpringsBasicsScreen() {

    var options = {
      backgroundColorProperty: new Property( 'white' )
    };

    Screen.call( this,
      function() { return new MassesAndSpringsBasicsModel(); },
      function( model ) { return new MassesAndSpringsBasicsScreenView( model ); },
      options
    );
  }

  massesAndSpringsBasics.register( 'MassesAndSpringsBasicsScreen', MassesAndSpringsBasicsScreen );

  return inherit( Screen, MassesAndSpringsBasicsScreen );
} );