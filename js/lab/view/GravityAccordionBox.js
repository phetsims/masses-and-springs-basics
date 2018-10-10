// Copyright 2017-2018, University of Colorado Boulder

/**
 * AccordionBox for the gravity options.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
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

  // strings
  var lotsString = require( 'string!MASSES_AND_SPRINGS/lots' );
  var noneString = require( 'string!MASSES_AND_SPRINGS/none' );
  var gravityString = require( 'string!MASSES_AND_SPRINGS/gravity' );
  var whatIsTheValueOfGravityString = require( 'string!MASSES_AND_SPRINGS/whatIsTheValueOfGravity' );

  // constants
  var MAX_WIDTH = 100;

  /**
   * @param {MassesAndSpringsModel} model
   * @param {Node} listNodeParent
   * @param {AlignGroup} alignGroup
   * @param {Tandem} tandem
   *
   * @constructor
   */
  function GravityAccordionBox( model, listNodeParent, alignGroup, tandem ) {

    // Create gravity slider
    var gravitySlider = new HSlider( model.gravityProperty, MassesAndSpringsConstants.GRAVITY_RANGE, {
      majorTickLength: 5,
      minorTickLength: 5,
      trackSize: new Dimension2( 165, 0.1 ),
      thumbSize: new Dimension2( 13, 22 ),
      thumbFillEnabled: '#00C4DF',
      thumbFillHighlighted: MassesAndSpringsConstants.THUMB_HIGHLIGHT
    } );
    gravitySlider.addMajorTick( MassesAndSpringsConstants.GRAVITY_RANGE.min, new Text( noneString, {
      font: MassesAndSpringsConstants.LABEL_FONT,
      tandem: tandem.createTandem( 'gravityNoneString' ),
      maxWidth: MAX_WIDTH * 0.5
    } ) );
    gravitySlider.addMajorTick( MassesAndSpringsConstants.GRAVITY_RANGE.max, new Text( lotsString, {
      font: MassesAndSpringsConstants.LABEL_FONT,
      tandem: tandem.createTandem( 'gravityLotsString' ),
      maxWidth: MAX_WIDTH * 0.5
    } ) );

    // Text that reads "What is the value of gravity?"
    var questionTextNode = new Node( {
      children: [ new Text( whatIsTheValueOfGravityString, {
        font: MassesAndSpringsConstants.TITLE_FONT,
        maxWidth:MAX_WIDTH*2
      } ) ]
    } );

    //  Add gravity info for various planets
    var bodyListItems = [];
    var bodies = Body.BODIES;
    Body.BODIES.forEach( function( body ) {
      var bodyLabel = new Text( body.title, {
        font: MassesAndSpringsConstants.LABEL_FONT,
        maxWidth: MAX_WIDTH,
        tandem: tandem.createTandem( 'bodyLabel' )
      } );
      bodyLabel.localBounds = bodyLabel.localBounds.withX( 107 );
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
      gravitySlider.visible = !questionTextNode.visible;

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
    } );

    var accordionBoxContent = new Node( {
      children: [
        gravitySlider,
        questionTextNode,
        gravityComboBox
      ]
    } );

    // Alignments of accordion box content
    gravityComboBox.top = gravitySlider.top + 45;
    questionTextNode.center = gravitySlider.center;

    AccordionBox.call( this, new AlignBox( accordionBoxContent, { alignGroup: alignGroup } ), {
      buttonYMargin: 4,
      contentXMargin: 0,
      cornerRadius: MassesAndSpringsConstants.PANEL_CORNER_RADIUS,
      minWidth: 224,
      titleNode: new Text( gravityString, { font: MassesAndSpringsConstants.TITLE_FONT, maxWidth: MAX_WIDTH } ),
      expandedProperty: new BooleanProperty( false ),
      titleAlignX: 'left'
    } );
  }

  massesAndSpringsBasics.register( 'GravityAccordionBox', GravityAccordionBox );

  return inherit( AccordionBox, GravityAccordionBox );
} );