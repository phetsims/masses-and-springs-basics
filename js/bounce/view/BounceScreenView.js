// Copyright 2018, University of Colorado Boulder

/**
 * View for Bounce screen.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var TwoSpringScreenView = require( 'MASSES_AND_SPRINGS/common/view/TwoSpringScreenView' );
  var ReferenceLineNode = require( 'MASSES_AND_SPRINGS/common/view/ReferenceLineNode' );
  var LineOptionsNode = require( 'MASSES_AND_SPRINGS_BASICS/common/view/LineOptionsNode' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var EQUILIBRIUM_LINE_FILL = new Color( 'rgb( 0, 180, 0 )' );

  /**
   * @param {VectorsModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function BounceScreenView( model, tandem ) {

    // Calls common two spring view
    TwoSpringScreenView.call( this, model, tandem );
    var self = this;

    // Equilibrium of mass is dependent on the mass being attached and the visibility of the equilibrium line.
    var firstMassEquilibriumVisibilityProperty = new DerivedProperty( [ model.equilibriumPositionVisibleProperty, model.firstSpring.massAttachedProperty ],
      function( equilibriumPositionVisible, massAttached ) {
        return !!massAttached && equilibriumPositionVisible;
      } );
    var secondMassEquilibriumVisibilityProperty = new DerivedProperty( [ model.equilibriumPositionVisibleProperty, model.secondSpring.massAttachedProperty ],
      function( equilibriumPositionVisible, massAttached ) {
        return !!massAttached && equilibriumPositionVisible;
      } );

    // Initializes equilibrium line for first spring
    var firstSpringEquilibriumLineNode = new ReferenceLineNode(
      this.modelViewTransform,
      model.firstSpring,
      model.firstSpring.massEquilibriumYPositionProperty,
      firstMassEquilibriumVisibilityProperty, {
        stroke: EQUILIBRIUM_LINE_FILL
      }
    );

    // Initializes equilibrium line for second spring
    var secondSpringEquilibriumLineNode = new ReferenceLineNode(
      this.modelViewTransform,
      model.secondSpring,
      model.secondSpring.massEquilibriumYPositionProperty,
      secondMassEquilibriumVisibilityProperty, {
        stroke: EQUILIBRIUM_LINE_FILL
      }
    );

    // Reference lines from indicator visibility box
    this.addChild( firstSpringEquilibriumLineNode );
    this.addChild( secondSpringEquilibriumLineNode );

    // We do this to prevent overlap with the massNodes.
    firstSpringEquilibriumLineNode.moveToBack();
    secondSpringEquilibriumLineNode.moveToBack();

    // Panel that will display all the toggleable options.
    var optionsPanel = this.createOptionsPanel(
      new LineOptionsNode( model, tandem, { enableMovableLine: true } ),
      this.rightPanelAlignGroup,
      tandem
    );

    // Contains all of the options for the reference lines, gravity, damping, and toolbox
    var rightPanelsVBox = new VBox( { children: [ optionsPanel, self.toolboxPanel ], spacing: this.spacing * 0.9 } );
    this.addChild( rightPanelsVBox );
    rightPanelsVBox.moveToBack();

    this.visibleBoundsProperty.link( function() {
      rightPanelsVBox.rightTop = new Vector2( self.panelRightSpacing, self.spacing);
    } );

    // Move this plane to the back of the scene graph
    this.backgroundDragNode.moveToBack();
  }

  massesAndSpringsBasics.register( 'BounceScreenView', BounceScreenView );

  return inherit( TwoSpringScreenView, BounceScreenView );
} );