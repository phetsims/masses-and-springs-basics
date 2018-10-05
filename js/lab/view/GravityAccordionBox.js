// Copyright 2017-2018, University of Colorado Boulder

/**
 * AccordionBox for the gravity options.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var Text = require( 'SCENERY/nodes/Text' );
  var AccordionBox = require( 'SUN/AccordionBox' );
  var Body = require( 'MASSES_AND_SPRINGS/common/model/Body' );
  var ComboBox = require( 'SUN/ComboBox' );
  var MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var lotsString = require( 'string!MASSES_AND_SPRINGS/lots' );
  var noneString = require( 'string!MASSES_AND_SPRINGS/none' );
  var gravityString = require( 'string!MASSES_AND_SPRINGS/gravity' );
  var whatIsTheValueOfGravityString = require( 'string!MASSES_AND_SPRINGS/whatIsTheValueOfGravity' );

  // constants
  var MAX_WIDTH = 80;

  /**
   * @param {MassesAndSpringsModel} model
   * @param {Node} listNodeParent
   * @param {Tandem} tandem
   *
   * @constructor
   */
  function GravityAccordionBox( model, listNodeParent, tandem ) {

    // Create gravity slider
    var gravitySlider = new HSlider( model.gravityProperty, MassesAndSpringsConstants.GRAVITY_RANGE, {
      majorTickLength: 5,
      minorTickLength: 5,
      trackSize: new Dimension2( 130, 0.1 ),
      thumbSize: new Dimension2( 13, 22 ),
      thumbFillEnabled: '#00C4DF',
      thumbFillHighlighted: MassesAndSpringsConstants.THUMB_HIGHLIGHT,
      stroke: null,
      sliderIndent: 7
    } );
    gravitySlider.addMajorTick( MassesAndSpringsConstants.GRAVITY_RANGE.min, new Text( noneString, {
      font: MassesAndSpringsConstants.LABEL_FONT,
      tandem: tandem.createTandem( 'gravityNoneString' ),
      maxWidth: MAX_WIDTH
    } ) );
    gravitySlider.addMajorTick( MassesAndSpringsConstants.GRAVITY_RANGE.max, new Text( lotsString, {
      font: MassesAndSpringsConstants.LABEL_FONT,
      tandem: tandem.createTandem( 'gravityLotsString' ),
      maxWidth: MAX_WIDTH
    } ) );

    // Text that reads "What is the value of gravity?"
    var questionTextNode = new Node( {
      children: [ new Text( whatIsTheValueOfGravityString, {
        font: MassesAndSpringsConstants.TITLE_FONT
      } ) ]
    } );

    //  Add gravity info for various planets
    var bodyListItems = [];
    var bodies = Body.BODIES;
    Body.BODIES.forEach( function( body ) {
      var bodyLabel = new Text( body.title, {
        font: MassesAndSpringsConstants.LABEL_FONT,
        maxWidth: MAX_WIDTH * 2,
        tandem: tandem.createTandem( 'bodyLabel' )
      } );
      bodyLabel.localBounds = bodyLabel.localBounds.withX( 50 );

      bodyListItems.push( {
        node: bodyLabel,
        value: body
      } );
    } );

    // Manages the items associated with the gravity panel in a combo box
    var gravityComboBox = new ComboBox( bodyListItems, model.bodyProperty, listNodeParent, {
      buttonCornerRadius: 3,
      buttonYMargin: 0,
      itemYMargin: 3,
      itemXMargin: 2,
      listYMargin: 3,
      tandem: tandem.createTandem( 'gravityComboBox' )
    } );

    // Responsible for managing bodies
    model.bodyProperty.link( function( newBody, oldBody ) {
      var body = _.find( bodies, newBody );

      // Set visibility of question node
      questionTextNode.visible = body === Body.PLANET_X;

      // If it's not custom, set it to its value
      if ( body !== Body.CUSTOM ) {
        model.gravityProperty.set( body.gravity );
      }
      else {
        // If we are switching from Planet X to Custom, don't let them cheat (go back to last custom value)
        if ( oldBody === Body.PLANET_X ) {
          model.gravityProperty.value = Body.CUSTOM.gravity;
        }

        // For non-Planet X, update our internal custom gravity
        else {
          Body.CUSTOM.gravity = model.gravityProperty.value;
        }
      }
    });

    var accordionBoxContent = new VBox( {
      children: [
        gravitySlider,
        gravityComboBox
      ], spacing: 4
    } );

    AccordionBox.call( this, accordionBoxContent, {
      buttonYMargin: 4,
      contentXMargin:33,
      cornerRadius: MassesAndSpringsConstants.PANEL_CORNER_RADIUS,
      titleNode: new Text( gravityString, { font: MassesAndSpringsConstants.TITLE_FONT } )
    } );
  }

  massesAndSpringsBasics.register( 'GravityAccordionBox', GravityAccordionBox );

  return inherit( AccordionBox, GravityAccordionBox );
} );