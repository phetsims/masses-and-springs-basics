// Copyright 2018, University of Colorado Boulder

/**
 * View for Lab screen.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PeriodTraceNode = require( 'MASSES_AND_SPRINGS/lab/view/PeriodTraceNode' );
  var LineOptionsNode = require( 'MASSES_AND_SPRINGS_BASICS/common/view/LineOptionsNode' );
  var GravityAccordionBox = require( 'MASSES_AND_SPRINGS_BASICS/lab/view/GravityAccordionBox' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  var MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  var OneSpringScreenView = require( 'MASSES_AND_SPRINGS/common/view/OneSpringScreenView' );
  var ReferenceLineNode = require( 'MASSES_AND_SPRINGS/common/view/ReferenceLineNode' );
  var Shelf = require( 'MASSES_AND_SPRINGS/common/view/Shelf' );
  var VectorVisibilityControlNode = require( 'MASSES_AND_SPRINGS/vectors/view/VectorVisibilityControlNode' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {LabModel} model
   * @param {Tandem} tandem
   *
   * @constructor
   */
  function LabScreenView( model, tandem ) {

    // Calls common spring view
    OneSpringScreenView.call( this, model, tandem );
    var self = this;

    // @protected {PeriodTraceNode}
    this.periodTraceNode = new PeriodTraceNode( model.periodTrace, this.modelViewTransform, {
      center: this.massEquilibriumLineNode.center
    } );
    this.addChild( this.periodTraceNode );

    var vectorVisibilityControlNode = new VectorVisibilityControlNode(
      model,
      tandem.createTandem( 'vectorVisibilityControlNode' ),
      {
        maxWidth: MassesAndSpringsConstants.PANEL_MAX_WIDTH + 30,
        showForces: false
      } );

    // VBox that contains all of the panel's content
    var optionsVBox = new VBox( {
      spacing: 10,
      children: [
        new LineOptionsNode( model, tandem, { enableMovableLine: true, enablePeriodTrace: true } ),
        MassesAndSpringsConstants.LINE_SEPARATOR( 165 ),
        vectorVisibilityControlNode
      ]
    } );

    // Panel that will display all the toggleable options.
    var optionsPanel = this.createOptionsPanel( optionsVBox, this.rightPanelAlignGroup, tandem );

    var gravityAccordionBox = new GravityAccordionBox( model, this, this.rightPanelAlignGroup, tandem.createTandem( 'gravityAccordionBox' ) );

    // Contains all of the options for the reference lines, gravity, damping, and toolbox
    var rightPanelsVBox = new VBox( {
      children: [ optionsPanel, gravityAccordionBox, self.toolboxPanel ],
      spacing: this.spacing * 0.9
    } );
    this.addChild( rightPanelsVBox );
    rightPanelsVBox.moveToBack();

    this.visibleBoundsProperty.link( function() {
      rightPanelsVBox.rightTop = new Vector2( self.panelRightSpacing, self.spacing );
    } );

    // Shelf used for masses
    var shelf = new Shelf( tandem, {
      rectHeight: 7,
      rectWidth: 200,
      left: this.springSystemControlsNode.left - 70,
      rectY: this.modelViewTransform.modelToViewY( MassesAndSpringsConstants.FLOOR_Y ) - this.shelf.rectHeight
    } );
    this.addChild( shelf );
    shelf.moveToBack();

    // @public {ReferenceLineNode} Initializes equilibrium line for an attached mass
    var equilibriumLineNode = new ReferenceLineNode(
      this.modelViewTransform,
      model.firstSpring,
      model.firstSpring.equilibriumYPositionProperty,
      this.equilibriumVisibilityProperty, {
        stroke: MassesAndSpringsColorProfile.restingPositionProperty
      }
    );
    this.addChild(equilibriumLineNode);

    // Move tools layer so ruler is always in front.
    this.toolsLayer.moveToFront();

    // Move this plane to the back of the scene graph
    this.backgroundDragNode.moveToBack();
  }

  massesAndSpringsBasics.register( 'LabScreenView', LabScreenView );
  return inherit( OneSpringScreenView, LabScreenView, {
    step: function( dt ) {
      this.periodTraceNode.step( dt, this.model.playingProperty );
    }
  } );
} );