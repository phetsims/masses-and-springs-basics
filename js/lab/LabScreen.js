// Copyright 2018, University of Colorado Boulder

/**
 * The Lab screen for Masses and Springs: Basics.
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
  var LabModel = require( 'MASSES_AND_SPRINGS/lab/model/LabModel' );
  var Screen = require( 'JOIST/Screen' );
  var LabScreenView = require( 'MASSES_AND_SPRINGS_BASICS/lab/view/LabScreenView' );

  // strings
  var screenLabString = require( 'string!MASSES_AND_SPRINGS_BASICS/screen.lab' );

  // image
  var labHomeScreenImage = require( 'image!MASSES_AND_SPRINGS_BASICS/lab_screen_icon.png' );

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
      backgroundColorProperty: MassesAndSpringsColorProfile.backgroundProperty,
      homeScreenIcon: new Image( labHomeScreenImage ),
      tandem: tandem
    }, options );

    Screen.call( this,
      function() {
        return new LabModel( tandem.createTandem( 'model' ), options );
      },
      function( model ) {
        return new LabScreenView( model, tandem );
      },
      options
    );
  }

  massesAndSpringsBasics.register( 'LabScreen', LabScreen );
  return inherit( Screen, LabScreen );
} );
