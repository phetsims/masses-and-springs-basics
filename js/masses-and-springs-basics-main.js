// Copyright 2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var MassesAndSpringsBasicsScreen = require( 'MASSES_AND_SPRINGS_BASICS/masses-and-springs-basics/MassesAndSpringsBasicsScreen' );

  // strings
  var massesAndSpringsBasicsTitleString = require( 'string!MASSES_AND_SPRINGS_BASICS/masses-and-springs-basics.title' );

  var simOptions = {
    credits: {
      //TODO fill in proper credits, all of these fields are optional, see joist.AboutDialog
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      qualityAssurance: '',
      graphicArts: '',
      thanks: ''
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( massesAndSpringsBasicsTitleString, [ new MassesAndSpringsBasicsScreen() ], simOptions );
    sim.start();
  } );
} );