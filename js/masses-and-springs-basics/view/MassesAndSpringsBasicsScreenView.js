// Copyright 2018, University of Colorado Boulder

/**
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );

  /**
   * @param {MassesAndSpringsBasicsModel} massesAndSpringsBasicsModel
   * @constructor
   */
  function MassesAndSpringsBasicsScreenView( massesAndSpringsBasicsModel ) {

    ScreenView.call( this );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        massesAndSpringsBasicsModel.reset();
      },
      right:  this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );
  }

  massesAndSpringsBasics.register( 'MassesAndSpringsBasicsScreenView', MassesAndSpringsBasicsScreenView );

  return inherit( ScreenView, MassesAndSpringsBasicsScreenView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );