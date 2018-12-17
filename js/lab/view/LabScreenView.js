// Copyright 2018, University of Colorado Boulder

/**
 * View for Lab screen.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var GravityAccordionBox = require( 'MASSES_AND_SPRINGS_BASICS/lab/view/GravityAccordionBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineOptionsNode = require( 'MASSES_AND_SPRINGS_BASICS/common/view/LineOptionsNode' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  var MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  var MassValueControlPanel = require( 'MASSES_AND_SPRINGS/common/view/MassValueControlPanel' );
  var OneSpringScreenView = require( 'MASSES_AND_SPRINGS/common/view/OneSpringScreenView' );
  var PeriodTraceNode = require( 'MASSES_AND_SPRINGS/lab/view/PeriodTraceNode' );
  var ReferenceLineNode = require( 'MASSES_AND_SPRINGS/common/view/ReferenceLineNode' );
  var Shelf = require( 'MASSES_AND_SPRINGS/common/view/Shelf' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );
  var VectorVisibilityControlNode = require( 'MASSES_AND_SPRINGS/vectors/view/VectorVisibilityControlNode' );

  // strings
  var centerOfOscillationString = require( 'string!MASSES_AND_SPRINGS_BASICS/centerOfOscillation' );

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
        new LineOptionsNode( model, tandem ),
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

    // Shelf used for masses
    var shelf = new Shelf( tandem, {
      rectHeight: 7,
      rectWidth: 200,
      left: this.visibleBoundsProperty.value.left + this.spacing,
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
    this.addChild( equilibriumLineNode );

    var oscillationVisibilityProperty = new DerivedProperty( [
        model.firstSpring.periodTraceVisibilityProperty,
        model.accelerationVectorVisibilityProperty,
        model.velocityVectorVisibilityProperty,
        model.firstSpring.massAttachedProperty
      ],
      function( periodTraceVisible, accelerationVectorVisible, velocityVectorVisible, massAttached ) {
        if ( massAttached ) {
          return periodTraceVisible || accelerationVectorVisible || velocityVectorVisible;
        }
        else {
          return false;
        }
      } );

    // Initializes center of oscillation line for an attached mass
    var centerOfOscillationLineNode = new ReferenceLineNode(
      this.modelViewTransform,
      model.firstSpring,
      model.firstSpring.massEquilibriumYPositionProperty,
      oscillationVisibilityProperty, {
        stroke: 'black',
        label: new Text( centerOfOscillationString, {
          font: MassesAndSpringsConstants.TITLE_FONT,
          fill: 'black',
          maxWidth: 125
        } )
      }
    );
    this.addChild( centerOfOscillationLineNode );

    // @public {MassValueControlPanel} Accessed in Basics version to adjust to a larger width.
    var massValueControlPanel = new MassValueControlPanel(
      model.masses[ 0 ],
      this.massNodeIcon,
      tandem.createTandem( 'massValueControlPanel' ), {
        maxWidth: MassesAndSpringsConstants.PANEL_MAX_WIDTH + MassesAndSpringsConstants.PANEL_MAX_WIDTH * 0.05,
        basicsVersion: model.options.basicsVersion
      }
    );

    this.springSystemControlsNode.setChildren( [
      massValueControlPanel, this.springHangerNode, this.springStopperButtonNode
    ] );
    this.springSystemControlsNode.spacing = this.spacing * 1.2;

    // @protected {PeriodTraceNode}
    this.periodTraceNode = new PeriodTraceNode( model.periodTrace, this.modelViewTransform, model.options.basicsVersion, {
      center: this.massEquilibriumLineNode.center
    } );
    this.addChild( this.periodTraceNode );
    this.periodTraceNode.moveToBack();

    // Move layers with interactive elements to the front
    this.movableLineNode.moveToFront();
    this.massLayer.moveToFront();
    this.toolsLayer.moveToFront();

    // Move this plane to the back of the scene graph
    this.backgroundDragPlane.moveToBack();

    this.visibleBoundsProperty.link( function() {
      rightPanelsVBox.rightTop = new Vector2( self.panelRightSpacing, self.spacing );
      self.springSystemControlsNode.centerX = self.springCenter * 0.835; // centering springHangerNode over spring
      self.springConstantControlPanel.left = self.springSystemControlsNode.right + self.spacing;
    } );
  }

  massesAndSpringsBasics.register( 'LabScreenView', LabScreenView );
  return inherit( OneSpringScreenView, LabScreenView, {
    step: function( dt ) {
      this.periodTraceNode.step( dt, this.model.playingProperty );
    }
  } );
} );