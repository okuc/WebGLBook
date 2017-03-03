// Interaction classes
Sim.PlaneDragger = function()
{
	Sim.Publisher.call(this);	
}

Sim.PlaneDragger.prototype = new Sim.Publisher;

Sim.PlaneDragger.prototype.init = function(object)
{
	// Connect us to the object to drag
	this.object = object;
	
	// We'll need a handle to the app for projection stuff
	this.app = object.getApp();

    // Create a projector object
    this.projector = new THREE.Projector();
	
    // And some helpers
	this.dragOffset = new THREE.Vector3;
	this.dragHitPoint = new THREE.Vector3;
	this.dragStartPoint = new THREE.Vector3;
	this.dragPlane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x000000 } ) );
}

Sim.PlaneDragger.prototype.beginDrag = function(x, y)
{
	var planeIntersects = this.getPlaneIntersection(x, y);
	
	if (planeIntersects.length)
	{
		this.dragOffset.copy( planeIntersects[ 0 ].point.subSelf( this.dragPlane.position ));
		this.dragStartPoint = this.object.object3D.position.clone();
	}
}

Sim.PlaneDragger.prototype.drag = function(x, y)
{
	var planeIntersects = this.getPlaneIntersection(x, y);
	
	if (planeIntersects.length)
	{
		this.dragHitPoint.copy(planeIntersects[ 0 ].point.subSelf( this.dragOffset ) );
		this.dragHitPoint.addSelf(this.dragStartPoint);
		this.publish("drag", this.dragHitPoint);
	}			
}
