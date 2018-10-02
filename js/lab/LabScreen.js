// Copyright 2018, University of Colorado Boulder

/**
 * The Lab screen for Masses and Springs: Basics.
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
  var BounceScreenView = require( 'MASSES_AND_SPRINGS_BASICS/bounce/view/BounceScreenView' );

  // strings
  var screenLabString = require( 'string!MASSES_AND_SPRINGS_BASICS/screen.lab' );

  /**
   * @param {Tandem} tandem
   * @param {object} options
   *
   * @constructor
   */
  function LabScreen( tandem, options ) {

    options = _.extend( {
      basicsVersion: true,
      name: screenLabString,
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
      function( model ) { return new BounceScreenView(model, tandem ); },
      options
    );
  }

  massesAndSpringsBasics.register( 'LabScreen', LabScreen );
  return inherit( Screen, LabScreen );
} );
