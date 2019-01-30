// Copyright 2018, University of Colorado Boulder

/**
 * The Stretch screen for Masses and Springs: Basics.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Image = require( 'SCENERY/nodes/Image' );
  const massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  const MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  const MassesAndSpringsModel = require( 'MASSES_AND_SPRINGS/common/model/MassesAndSpringsModel' );
  const Screen = require( 'JOIST/Screen' );
  const StretchScreenView = require( 'MASSES_AND_SPRINGS_BASICS/stretch/view/StretchScreenView' );

  // strings
  const screenStretchString = require( 'string!MASSES_AND_SPRINGS_BASICS/screen.stretch' );

  // image
  const stretchHomeScreenImage = require( 'image!MASSES_AND_SPRINGS_BASICS/stretch_screen_icon.png' );

  class StretchScreen extends Screen {
    /**
     * @param {Tandem} tandem
     * @param {object} options
     *
     */
    constructor( tandem, options ) {

      options = _.extend( {
        name: screenStretchString,
        backgroundColorProperty: MassesAndSpringsColorProfile.backgroundProperty,
        homeScreenIcon: new Image( stretchHomeScreenImage ),
        tandem: tandem
      }, options );

      super( () => {

          // Reference for model tandem
          const modelTandem = tandem.createTandem( 'model' );

          // Reference for model used in spring and mass creation
          const model = new MassesAndSpringsModel( modelTandem, options );
          model.addDefaultSprings( modelTandem );
          model.addDefaultMasses( modelTandem );

          // It is intended that the stretch screen have a specific damping
          model.dampingProperty.set( 0.7 );
          return model;
        },
        model => { return new StretchScreenView( model, tandem.createTandem( 'view' ) ); },
        options
      );
    }
  }

  return massesAndSpringsBasics.register( 'StretchScreen', StretchScreen );
} );
