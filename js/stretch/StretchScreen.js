// Copyright 2018, University of Colorado Boulder

/**
 * The Stretch screen for Masses and Springs: Basics.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  var MassesAndSpringsModel = require( 'MASSES_AND_SPRINGS/common/model/MassesAndSpringsModel' );
  var Screen = require( 'JOIST/Screen' );
  var StretchScreenView = require( 'MASSES_AND_SPRINGS_BASICS/stretch/view/StretchScreenView' );

  // strings
  var screenStretchString = require( 'string!MASSES_AND_SPRINGS_BASICS/screen.stretch' );

  // image
  var stretchHomeScreenImage = require( 'image!MASSES_AND_SPRINGS_BASICS/stretch_screen_icon.png' );

  /**
   * @param {Tandem} tandem
   * @param {object} options
   *
   * @constructor
   */
  function StretchScreen( tandem, options ) {

    options = _.extend( {
      basicsVersion: true,
      name: screenStretchString,
      backgroundColorProperty: MassesAndSpringsColorProfile.backgroundProperty,
      homeScreenIcon: new Image( stretchHomeScreenImage ),
      tandem: tandem
    }, options );

    Screen.call( this,
      function() {
        var modelTandem = tandem.createTandem( 'model' );
        var model = new MassesAndSpringsModel( modelTandem, options );
        model.addDefaultSprings( modelTandem );
        model.addDefaultMasses( modelTandem );
        model.dampingProperty.set( 0.7 );
        return model;
      },
      function( model ) { return new StretchScreenView( model, tandem ); },
      options
    );
  }

  massesAndSpringsBasics.register( 'StretchScreen', StretchScreen );
  return inherit( Screen, StretchScreen );
} );
