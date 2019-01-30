// Copyright 2018-2019, University of Colorado Boulder

/**
 * The Bounce screen for Masses and Springs: Basics.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BounceScreenView = require( 'MASSES_AND_SPRINGS_BASICS/bounce/view/BounceScreenView' );
  const Image = require( 'SCENERY/nodes/Image' );
  const massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  const MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  const MassesAndSpringsModel = require( 'MASSES_AND_SPRINGS/common/model/MassesAndSpringsModel' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenBounceString = require( 'string!MASSES_AND_SPRINGS_BASICS/screen.bounce' );

  // images
  const bounceHomeScreenImage = require( 'image!MASSES_AND_SPRINGS_BASICS/bounce_screen_icon.png' );

  class BounceScreen extends Screen {

    /**
     * @param {Tandem} tandem
     * @param {object} options
     */
    constructor( tandem, options ) {

      options = _.extend( {
        name: screenBounceString,
        backgroundColorProperty: MassesAndSpringsColorProfile.backgroundProperty,
        homeScreenIcon: new Image( bounceHomeScreenImage ),
        tandem: tandem
      }, options );

      super( () => {

          //tandem reference for model
          const modelTandem = tandem.createTandem( 'model' );

          // model reference used for spring and mass creation
          const model = new MassesAndSpringsModel( modelTandem, options );
          model.basicsVersion = true;
          model.addDefaultSprings( modelTandem );
          model.addDefaultMasses( modelTandem );
          return model;
        },
        model => { return new BounceScreenView( model, tandem.createTandem( 'view' ) ); },
        options
      );
    }
  }

  return massesAndSpringsBasics.register( 'BounceScreen', BounceScreen );
} );
