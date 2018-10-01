// Copyright 2018, University of Colorado Boulder

/**
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );

  /**
   * @constructor
   */
  function MassesAndSpringsBasicsModel() {
    //TODO
  }

  massesAndSpringsBasics.register( 'MassesAndSpringsBasicsModel', MassesAndSpringsBasicsModel );

  return inherit( Object, MassesAndSpringsBasicsModel, {

    // @public resets the model
    reset: function() {
      //TODO reset things here
    },

    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  } );
} );