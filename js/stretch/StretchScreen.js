// Copyright 2018, University of Colorado Boulder

/**
 * The Stretch screen for Masses and Springs:Basics.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var ColorIO = require( 'SCENERY/util/ColorIO' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroModel = require( 'MASSES_AND_SPRINGS/intro/model/IntroModel' );
  var IntroScreenView = require( 'MASSES_AND_SPRINGS/intro/view/IntroScreenView' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenStretchString = require( 'string!MASSES_AND_SPRINGS_BASICS/screen.stretch' );

  // image
  var introHomeScreenImage = require( 'image!MASSES_AND_SPRINGS/intro_screen_icon.png' );

  /**
   * @param {Tandem} tandem
   * @param {object} options
   *
   * @constructor
   */
  function StretchScreen( tandem, options ) {

    options = _.extend( {
      basicsVersion: false,
      name: screenStretchString,
      backgroundColorProperty: new Property( new Color( 'white' ), {
        tandem: tandem.createTandem( 'backgroundColorProperty' ),
        phetioType: PropertyIO( ColorIO )
      } ),
      homeScreenIcon: new Image( introHomeScreenImage ),
      tandem: tandem
    }, options );

    Screen.call( this,
      function() { return new IntroModel( tandem.createTandem( 'model' ), options ); },
      function( model ) { return new IntroScreenView( model, tandem.createTandem( 'view' ), options ); },
      options
    );
  }

  massesAndSpringsBasics.register( 'StretchScreen', StretchScreen );
  return inherit( Screen, StretchScreen );
} );
