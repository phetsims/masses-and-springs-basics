// Copyright 2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BounceScreen = require( 'MASSES_AND_SPRINGS_BASICS/bounce/BounceScreen' );
  var LabScreen = require( 'MASSES_AND_SPRINGS_BASICS/lab/LabScreen' );
  var MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var StretchScreen = require( 'MASSES_AND_SPRINGS_BASICS/stretch/StretchScreen' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var massesAndSpringsBasicsTitleString = require( 'string!MASSES_AND_SPRINGS_BASICS/masses-and-springs-basics.title' );

  // constants
  var tandem = Tandem.rootTandem;

  // Todo: Correct credits.
  var simOptions = {
    credits: {
      leadDesign: 'Amy Rouinfar, Mike Dubson',
      softwareDevelopment: 'Denzell Barnett',
      team: 'Wendy Adams, Ariel Paul, Kathy Perkins in cooperation with the Next-Lab project',
      qualityAssurance: ''
    }
  };
  // Set the profile name for the ColorProfile used in this sim
  MassesAndSpringsColorProfile.profileNameProperty.set( 'basics' );

  SimLauncher.launch( function() {
    var sim = new Sim( massesAndSpringsBasicsTitleString, [
      new StretchScreen( tandem.createTandem( 'stretchScreen' ) ),
      new BounceScreen( tandem.createTandem( 'bounceScreen' ) ),
      new LabScreen( tandem.createTandem( 'labScreen' ) )
    ], simOptions );
    sim.start();
  } );
} );