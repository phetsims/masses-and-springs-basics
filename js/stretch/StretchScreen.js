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
  var inherit = require( 'PHET_CORE/inherit' );
  var MassesAndSpringsModel = require( 'MASSES_AND_SPRINGS/common/model/MassesAndSpringsModel' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var Screen = require( 'JOIST/Screen' );
  var StretchScreenView = require( 'MASSES_AND_SPRINGS_BASICS/stretch/view/StretchScreenView' );

  // strings
  var screenStretchString = require( 'string!MASSES_AND_SPRINGS_BASICS/screen.stretch' );

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
      backgroundColorProperty: new Property( new Color( 'white' ), {
        tandem: tandem.createTandem( 'backgroundColorProperty' ),
        phetioType: PropertyIO( ColorIO )
      } ),
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
      function( model ) { return new StretchScreenView (model, tandem ); },
      options
    );
  }

  massesAndSpringsBasics.register( 'StretchScreen', StretchScreen );
  return inherit( Screen, StretchScreen );
} );
