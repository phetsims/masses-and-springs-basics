// Copyright 2018, University of Colorado Boulder

/**
 * The Bounce screen for Masses and Springs: Basics.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BounceScreenView = require( 'MASSES_AND_SPRINGS_BASICS/bounce/view/BounceScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  var MassesAndSpringsModel = require( 'MASSES_AND_SPRINGS/common/model/MassesAndSpringsModel' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenBounceString = require( 'string!MASSES_AND_SPRINGS_BASICS/screen.bounce' );

  // image
  var bounceHomeScreenImage = require( 'image!MASSES_AND_SPRINGS_BASICS/bounce_screen_icon.png' );

  /**
   * @param {Tandem} tandem
   * @param {object} options
   *
   * @constructor
   */
  function BounceScreen( tandem, options ) {

    options = _.extend( {
      basicsVersion: true,
      name: screenBounceString,
      backgroundColorProperty: MassesAndSpringsColorProfile.backgroundProperty,
      homeScreenIcon: new Image( bounceHomeScreenImage ),
      tandem: tandem
    }, options );

    Screen.call( this,
      function() {
        var modelTandem = tandem.createTandem( 'model' );
        var model = new MassesAndSpringsModel( modelTandem, options );
        model.addDefaultSprings( modelTandem );
        model.addDefaultMasses( modelTandem );
        return model;
      },
      function( model ) { return new BounceScreenView( model, tandem ); },
      options
    );
  }

  massesAndSpringsBasics.register( 'BounceScreen', BounceScreen );
  return inherit( Screen, BounceScreen );
} );
