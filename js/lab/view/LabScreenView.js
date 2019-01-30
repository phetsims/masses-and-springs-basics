// Copyright 2018, University of Colorado Boulder

/**
 * View for Lab screen.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const GravityAccordionBox = require( 'MASSES_AND_SPRINGS_BASICS/lab/view/GravityAccordionBox' );
  const LineOptionsNode = require( 'MASSES_AND_SPRINGS_BASICS/common/view/LineOptionsNode' );
  const massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  const MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  const MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  const MassValueControlPanel = require( 'MASSES_AND_SPRINGS/common/view/MassValueControlPanel' );
  const OneSpringScreenView = require( 'MASSES_AND_SPRINGS/common/view/OneSpringScreenView' );
  const PeriodTraceNode = require( 'MASSES_AND_SPRINGS/lab/view/PeriodTraceNode' );
  const ReferenceLineNode = require( 'MASSES_AND_SPRINGS/common/view/ReferenceLineNode' );
  const ShelfNode = require( 'MASSES_AND_SPRINGS/common/view/ShelfNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );
  const VectorVisibilityControlNode = require( 'MASSES_AND_SPRINGS/vectors/view/VectorVisibilityControlNode' );

  // strings
  const centerOfOscillationString = require( 'string!MASSES_AND_SPRINGS_BASICS/centerOfOscillation' );

  class LabScreenView extends OneSpringScreenView {
    /**
     * @param {LabModel} model
     * @param {Tandem} tandem
     *
     */
    constructor( model, tandem ) {

      // Calls common spring view
      super( model, tandem );

      const vectorVisibilityControlNode = new VectorVisibilityControlNode(
        model,
        tandem.createTandem( 'vectorVisibilityControlNode' ),
        {
          maxWidth: MassesAndSpringsConstants.PANEL_MAX_WIDTH + 30,
          showForces: false
        } );

      // VBox that contains all of the panel's content
      const optionsVBox = new VBox( {
        spacing: 10,
        children: [
          new LineOptionsNode( model, tandem ),
          MassesAndSpringsConstants.LINE_SEPARATOR( 165 ),
          vectorVisibilityControlNode
        ]
      } );

      // Panel that will display all the toggleable options.
      const optionsPanel = this.createOptionsPanel( optionsVBox, this.rightPanelAlignGroup, tandem );

      const gravityAccordionBox = new GravityAccordionBox( model,
        this,
        this.rightPanelAlignGroup,
        tandem.createTandem( 'gravityAccordionBox' ), {
          expandedProperty: model.gravityAccordionBoxExpandedProperty
        } );

      // Contains all of the options for the reference lines, gravity, damping, and toolbox
      const rightPanelsVBox = new VBox( {
        children: [ optionsPanel, gravityAccordionBox, this.toolboxPanel ],
        spacing: this.spacing * 0.9
      } );

      // Shelf used for masses
      const shelf = new ShelfNode( tandem, {
        rectHeight: 7,
        rectWidth: 200,
        left: this.visibleBoundsProperty.value.left + this.spacing,
        rectY: this.modelViewTransform.modelToViewY( MassesAndSpringsConstants.FLOOR_Y ) - this.shelf.rectHeight
      } );

      // Initializes equilibrium line for an attached mass
      const equilibriumLineNode = new ReferenceLineNode(
        this.modelViewTransform,
        model.firstSpring,
        model.firstSpring.equilibriumYPositionProperty,
        this.equilibriumVisibilityProperty, {
          stroke: MassesAndSpringsColorProfile.restingPositionProperty
        }
      );
      this.addChild( equilibriumLineNode );

      const oscillationVisibilityProperty = new DerivedProperty( [
          model.firstSpring.periodTraceVisibilityProperty,
          model.accelerationVectorVisibilityProperty,
          model.velocityVectorVisibilityProperty,
          model.firstSpring.massAttachedProperty
        ],
        ( periodTraceVisible, accelerationVectorVisible, velocityVectorVisible, massAttached ) => {
          if ( massAttached ) {
            return periodTraceVisible || accelerationVectorVisible || velocityVectorVisible;
          }
          else {
            return false;
          }
        } );

      // Initializes center of oscillation line for an attached mass
      const centerOfOscillationLineNode = new ReferenceLineNode(
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

      // Accessed in Basics version to adjust to a larger width.
      const massValueControlPanel = new MassValueControlPanel(
        model.masses[ 0 ],
        this.massNodeIcon,
        tandem.createTandem( 'massValueControlPanel' ), {
          maxWidth: MassesAndSpringsConstants.PANEL_MAX_WIDTH + MassesAndSpringsConstants.PANEL_MAX_WIDTH * 0.05,
          basicsVersion: model.basicsVersion
        }
      );

      this.springSystemControlsNode.setChildren( [
        massValueControlPanel, this.springHangerNode, this.springStopperButtonNode
      ] );
      this.springSystemControlsNode.spacing = this.spacing * 1.2;

      // @private {PeriodTraceNode}
      this.periodTraceNode = new PeriodTraceNode( model.periodTrace, this.modelViewTransform, model.basicsVersion, {
        center: this.massEquilibriumLineNode.center
      } );

      // Move layers with interactive elements and layers to the front
      this.movableLineNode.moveToFront();
      this.massLayer.moveToFront();
      this.toolsLayer.moveToFront();

      // Back layer used to handle z order of view elements.
      this.backLayer.children = [ this.backgroundDragPlane, rightPanelsVBox, shelf, this.periodTraceNode ];

      this.visibleBoundsProperty.link( () => {
        rightPanelsVBox.rightTop = new Vector2( this.panelRightSpacing, this.spacing );
        this.springSystemControlsNode.centerX = this.springCenter * 0.835; // centering springHangerNode over spring
        this.springConstantControlPanel.left = this.springSystemControlsNode.right + this.spacing;
      } );
    }

    /**
     * @public
     *
     * @param {number} dt
     */
    step( dt ) {
      this.periodTraceNode.step( dt, this.model.playingProperty );
    }
  }

  return massesAndSpringsBasics.register( 'LabScreenView', LabScreenView );
} );