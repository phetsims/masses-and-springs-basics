// Copyright 2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BounceScreen = require( 'MASSES_AND_SPRINGS_BASICS/bounce/BounceScreen' );
  const LabScreen = require( 'MASSES_AND_SPRINGS_BASICS/lab/LabScreen' );
  const MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const StretchScreen = require( 'MASSES_AND_SPRINGS_BASICS/stretch/StretchScreen' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const massesAndSpringsBasicsTitleString = require( 'string!MASSES_AND_SPRINGS_BASICS/masses-and-springs-basics.title' );

  // constants
  const tandem = Tandem.rootTandem;

  // Todo: Correct credits.
  const simOptions = {
    credits: {
      leadDesign: 'Amy Rouinfar, Mike Dubson',
      softwareDevelopment: 'Denzell Barnett',
      team: 'Wendy Adams, Ariel Paul, Kathy Perkins in cooperation with the Next-Lab project',
      qualityAssurance: ''
    }
  };
  // Set the profile name for the ColorProfile used in this sim
  MassesAndSpringsColorProfile.profileNameProperty.set( 'basics' );

  SimLauncher.launch( () => {
    const sim = new Sim( massesAndSpringsBasicsTitleString, [
      new StretchScreen( tandem.createTandem( 'stretchScreen' ) ),
      new BounceScreen( tandem.createTandem( 'bounceScreen' ) ),
      new LabScreen( tandem.createTandem( 'labScreen' ) )
    ], simOptions );
    sim.start();
  } );
} );