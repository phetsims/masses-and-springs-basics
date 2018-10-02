// Copyright 2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var StretchScreen = require( 'MASSES_AND_SPRINGS_BASICS/stretch/StretchScreen' );
  var LabScreen = require( 'MASSES_AND_SPRINGS_BASICS/lab/LabScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );
  var BounceScreen = require( 'MASSES_AND_SPRINGS_BASICS/bounce/BounceScreen' );

  // strings
  var massesAndSpringsBasicsTitleString = require( 'string!MASSES_AND_SPRINGS_BASICS/masses-and-springs-basics.title' );

  // constants
  var tandem = Tandem.rootTandem;

  var simOptions = {
    credits: {
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      qualityAssurance: ''
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( massesAndSpringsBasicsTitleString, [
      new StretchScreen( tandem.createTandem( 'stretchScreen' ) ),
      new BounceScreen( tandem.createTandem( 'bounceScreen' ) ),
      new LabScreen( tandem.createTandem( 'labScreen' ) )
    ], simOptions );
    sim.start();
  } );
} );