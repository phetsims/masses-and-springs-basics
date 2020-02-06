// Copyright 2018-2020, University of Colorado Boulder

/**
 * The Lab screen for Masses and Springs: Basics.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Image = require( 'SCENERY/nodes/Image' );
  const LabModel = require( 'MASSES_AND_SPRINGS/lab/model/LabModel' );
  const LabScreenView = require( 'MASSES_AND_SPRINGS_BASICS/lab/view/LabScreenView' );
  const massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  const MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  const merge = require( 'PHET_CORE/merge' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenLabString = require( 'string!MASSES_AND_SPRINGS_BASICS/screen.lab' );

  // image
  const labHomeScreenImage = require( 'image!MASSES_AND_SPRINGS_BASICS/lab_screen_icon.png' );

  class LabScreen extends Screen {

    /**
     * @param {Tandem} tandem
     * @param {Object} [options]
     *
     */
    constructor( tandem, options ) {

      options = merge( {
        basicsVersion: true,
        name: screenLabString,
        backgroundColorProperty: MassesAndSpringsColorProfile.backgroundProperty,
        homeScreenIcon: new Image( labHomeScreenImage ),
        tandem: tandem
      }, options );

      super(
        () => new LabModel( tandem.createTandem( 'model' ), true, options ),
        model=> new LabScreenView( model, tandem.createTandem( 'view' ) ),
        options
      );
    }
  }

  return massesAndSpringsBasics.register( 'LabScreen', LabScreen );
} );
