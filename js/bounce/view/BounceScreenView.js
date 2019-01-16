// Copyright 2018, University of Colorado Boulder

/**
 * View for Bounce screen.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const LineOptionsNode = require( 'MASSES_AND_SPRINGS_BASICS/common/view/LineOptionsNode' );
  const massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  const MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  const MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  const ReferenceLineNode = require( 'MASSES_AND_SPRINGS/common/view/ReferenceLineNode' );
  const Shelf = require( 'MASSES_AND_SPRINGS/common/view/Shelf' );
  const TwoSpringScreenView = require( 'MASSES_AND_SPRINGS/common/view/TwoSpringScreenView' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );

  class BounceScreenView extends TwoSpringScreenView {
    /**
     * @param {VectorsModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      super( model, tandem );

      // Equilibrium of mass is dependent on the mass being attached and the visibility of the equilibrium line.
      const firstMassEquilibriumVisibilityProperty = new DerivedProperty( [ model.equilibriumPositionVisibleProperty, model.firstSpring.massAttachedProperty ],
        function( equilibriumPositionVisible, massAttached ) {
          return !!massAttached && equilibriumPositionVisible;
        } );
      const secondMassEquilibriumVisibilityProperty = new DerivedProperty( [ model.equilibriumPositionVisibleProperty, model.secondSpring.massAttachedProperty ],
        function( equilibriumPositionVisible, massAttached ) {
          return !!massAttached && equilibriumPositionVisible;
        } );

      // Initializes equilibrium line for first spring
      const firstMassEquilibriumLineNode = new ReferenceLineNode(
        this.modelViewTransform,
        model.firstSpring,
        model.firstSpring.equilibriumYPositionProperty,
        firstMassEquilibriumVisibilityProperty, {
          stroke: MassesAndSpringsColorProfile.restingPositionProperty
        }
      );

      // Initializes equilibrium line for second spring
      const secondMassEquilibriumLineNode = new ReferenceLineNode(
        this.modelViewTransform,
        model.secondSpring,
        model.secondSpring.equilibriumYPositionProperty,
        secondMassEquilibriumVisibilityProperty, {
          stroke: MassesAndSpringsColorProfile.restingPositionProperty
        }
      );

      // Adding system controls to scene graph
      this.addChild( this.springSystemControlsNode );

      // Reference lines from indicator visibility box
      this.addChild( this.firstNaturalLengthLineNode );
      this.addChild( this.secondNaturalLengthLineNode );
      this.addChild( firstMassEquilibriumLineNode );
      this.addChild( secondMassEquilibriumLineNode );
      this.addChild( this.movableLineNode );
      this.addChild( this.massLayer );
      this.addChild( this.toolsLayer );

      // Panel that will display all the toggleable options.
      const optionsPanel = this.createOptionsPanel(
        new LineOptionsNode( model, tandem ),
        this.rightPanelAlignGroup,
        tandem
      );

      // Contains all of the options for the reference lines, gravity, damping, and toolbox
      const rightPanelsVBox = new VBox( {
        children: [ optionsPanel, this.toolboxPanel ],
        spacing: this.spacing * 0.9
      } );
      this.addChild( rightPanelsVBox );
      rightPanelsVBox.moveToBack();

      this.visibleBoundsProperty.link( () => {
        rightPanelsVBox.rightTop = new Vector2( this.panelRightSpacing, this.spacing );
      } );

      // Move this plane to the back of the scene graph
      this.backgroundDragPlane.moveToBack();

      // Shelves used for masses
      const labeledMassesShelf = new Shelf( tandem, {
        rectHeight: 7,
        rectWidth: 185,
        left: this.layoutBounds.left + this.spacing,
        rectY: this.modelViewTransform.modelToViewY( MassesAndSpringsConstants.FLOOR_Y ) - this.shelf.rectHeight
      } );
      this.addChild( labeledMassesShelf );
      labeledMassesShelf.moveToBack();

      const mysteryMassesShelf = new Shelf( tandem, {
        rectHeight: 7,
        rectWidth: 120,
        left: labeledMassesShelf.right + this.spacing * 2,
        rectY: this.modelViewTransform.modelToViewY( MassesAndSpringsConstants.FLOOR_Y ) - this.shelf.rectHeight
      } );
      this.addChild( mysteryMassesShelf );
      mysteryMassesShelf.moveToBack();
    }
  }

  return massesAndSpringsBasics.register( 'BounceScreenView', BounceScreenView );
} );