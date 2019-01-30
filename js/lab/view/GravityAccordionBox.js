// Copyright 2018-2019, University of Colorado Boulder

/**
 * AccordionBox for the gravity options.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const Body = require( 'MASSES_AND_SPRINGS/common/model/Body' );
  const GravityComboBox = require( 'MASSES_AND_SPRINGS/common/view/GravityComboBox' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const HSlider = require( 'SUN/HSlider' );
  const massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  const MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const gravityString = require( 'string!MASSES_AND_SPRINGS/gravity' );
  const lotsString = require( 'string!MASSES_AND_SPRINGS/lots' );
  const noneString = require( 'string!MASSES_AND_SPRINGS/none' );
  const whatIsTheValueOfGravityString = require( 'string!MASSES_AND_SPRINGS/whatIsTheValueOfGravity' );

  // constants
  const MAX_WIDTH = 100;

  class GravityAccordionBox extends AccordionBox {
    /**
     * @param {MassesAndSpringsModel} model
     * @param {Node} listNodeParent
     * @param {AlignGroup} alignGroup
     * @param {Tandem} tandem
     * @param {Object} [options]
     *
     */
    constructor( model, listNodeParent, alignGroup, tandem, options ) {

      options = _.extend( {
        buttonYMargin: 4,
        contentXMargin: 0,
        cornerRadius: MassesAndSpringsConstants.PANEL_CORNER_RADIUS,
        minWidth: 224,
        titleNode: new Text( gravityString, { font: MassesAndSpringsConstants.TITLE_FONT, maxWidth: MAX_WIDTH } ),
        expandedProperty: new BooleanProperty( false ),
        titleAlignX: 'left'
      }, options );

      // Create gravity slider
      const gravitySlider = new HSlider( model.gravityProperty, MassesAndSpringsConstants.GRAVITY_RANGE, {
        majorTickLength: 5,
        minorTickLength: 5,
        trackSize: new Dimension2( 165, 0.1 ),
        thumbSize: new Dimension2( 13, 22 ),
        thumbFillEnabled: '#00C4DF',
        thumbFillHighlighted: MassesAndSpringsConstants.THUMB_HIGHLIGHT
      } );
      gravitySlider.addMajorTick( MassesAndSpringsConstants.GRAVITY_RANGE.min, new Text( noneString, {
        font: MassesAndSpringsConstants.LABEL_FONT,
        tandem: tandem.createTandem( 'gravityNoneText' ),
        maxWidth: MAX_WIDTH * 0.5
      } ) );
      gravitySlider.addMajorTick( MassesAndSpringsConstants.GRAVITY_RANGE.max, new Text( lotsString, {
        font: MassesAndSpringsConstants.LABEL_FONT,
        tandem: tandem.createTandem( 'gravityLotsText' ),
        maxWidth: MAX_WIDTH * 0.5
      } ) );

      // Text that reads "What is the value of gravity?"
      const questionTextNode = new Node( {
        children: [ new Text( whatIsTheValueOfGravityString, {
          font: MassesAndSpringsConstants.TITLE_FONT,
          maxWidth: MAX_WIDTH * 2
        } ) ]
      } );

      // Manages the items associated with the gravity panel in a combo box
      const gravityComboBox = new GravityComboBox( model.bodyProperty, listNodeParent, tandem, {
        cornerRadius: 3,
        buttonYMargin: 0,
        itemYMargin: 3,
        itemXMargin: 2,
        listYMargin: 3,
        tandem: tandem.createTandem( 'gravityComboBox' )
      } );

      // Responsible for managing bodies
      model.bodyProperty.link( ( newBody, oldBody ) => {
        const body = _.find( Body.BODIES, newBody );

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

      const accordionBoxContent = new Node( {
        children: [
          gravitySlider,
          questionTextNode,
          gravityComboBox
        ]
      } );

      // Alignments of accordion box content
      gravityComboBox.top = gravitySlider.top + 45;
      questionTextNode.center = gravitySlider.center;

      super( new AlignBox( accordionBoxContent, { alignGroup: alignGroup } ), options );
    }
  }

  return massesAndSpringsBasics.register( 'GravityAccordionBox', GravityAccordionBox );
} );