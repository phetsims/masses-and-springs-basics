// Copyright 2018, University of Colorado Boulder

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
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenLabString = require( 'string!MASSES_AND_SPRINGS_BASICS/screen.lab' );

  // image
  const labHomeScreenImage = require( 'image!MASSES_AND_SPRINGS_BASICS/lab_screen_icon.png' );

  class LabScreen extends Screen {

    /**
     * @param {Tandem} tandem
     * @param {object} options
     *
     * @constructor - REVIEW: We aren't using @constructor annotations for ES6 code
     */
    constructor( tandem, options ) {

      options = _.extend( {
        basicsVersion: true,
        name: screenLabString,
        backgroundColorProperty: MassesAndSpringsColorProfile.backgroundProperty,
        homeScreenIcon: new Image( labHomeScreenImage ),
        tandem: tandem
      }, options );

      super(
        () => new LabModel( tandem.createTandem( 'model' ), options ),
        model => { return new LabScreenView( model, tandem ); },
        options
      );
    }
  }

  return massesAndSpringsBasics.register( 'LabScreen', LabScreen );
} );
