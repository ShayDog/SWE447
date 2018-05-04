/////////////////////////////////////////////////////////////////////////////
//
//  Solar.js
//
/////////////////////////////////////////////////////////////////////////////

var canvas;
var gl;

//---------------------------------------------------------------------------
//
//  Declare our array of planets (each of which is a sphere)
//
// The list of planets to render.  Uncomment any planets that you are 
// including in the scene. For each planet in this list, make sure to 
// set its distance from the Sun, as well its size, color, and orbit
// around the Sun. 

var Planets = {
  Sun : undefined,
  Mercury : undefined,
  Venus : undefined,
  Earth : undefined,
  // Moon : undefined,
  Mars : undefined,
  Jupiter : undefined,
  // Saturn : undefined,
  // Uranus : undefined,
  // Neptune : undefined,
  // Pluto : undefined
};

var BodyArray = {
	body:undefined
}

var CapArray = {
	cap:undefined,
	cap2:undefined
}
var BaceArray = {
	bace1:undefined,
	bace2:undefined,
	bace3:undefined,
	bace4:undefined
}

// Viewing transformation parameters
var V;  // matrix storing the viewing transformation

// Projection transformation parameters
var P;  // matrix storing the projection transformation
var near = 10;      // near clipping plane's distance
var far = 120;      // far clipping plane's distance

// Animation variables
var time = 0.0;      // time, our global time constant, which is 
                     // incremented every frame
var timeDelta = 0.5; // the amount that time is updated each fraime

//---------------------------------------------------------------------------
//
//  init() - scene initialization function
//

function init() {
  canvas = document.getElementById("webgl-canvas");

  // Configure our WebGL environment
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.enable(gl.DEPTH_TEST);

  // Initialize the planets in the Planets list, including specifying
  // necesasry shaders, shader uniform variables, and other initialization
  // parameters.  This loops adds additinoal properties to each object
  // in the Planets object;

  for (var name in Planets ) {
    var planet = Planets[name] = new Sphere();
    planet.uniforms = { 
      color : gl.getUniformLocation(planet.program, "color"),
      MV : gl.getUniformLocation(planet.program, "MV"),
      P : gl.getUniformLocation(planet.program, "P"),
    };
  }
  
 
  
  for (var name in CapArray)
  {
	var mCap = CapArray[name] = new Cone(gl);
	mCap.uniforms = 
		{ 
			color : gl.getUniformLocation(mCap.program, "color"),
			MV : gl.getUniformLocation(mCap.program, "MV"),
			P : gl.getUniformLocation(mCap.program, "P"),
		};
  }
  
   for (var name in BodyArray)
  {
	var mBody = BodyArray[name] = new Cone(gl);
	mBody.uniforms = 
		{ 
			color : gl.getUniformLocation(mBody.program, "color"),
			MV : gl.getUniformLocation(mBody.program, "MV"),
			P : gl.getUniformLocation(mBody.program, "P"),
		};
  }
 resize();
  
   for (var name in BaceArray)
  {
	var mBace = BaceArray[name] = new Cone(gl);
	mBace.uniforms = 
		{ 
			color : gl.getUniformLocation(mBace.program, "color"),
			MV : gl.getUniformLocation(mBace.program, "MV"),
			P : gl.getUniformLocation(mBace.program, "P"),
		};
  }
  resize();

  window.requestAnimationFrame(render);  
}

//---------------------------------------------------------------------------
//
//  render() - render the scene
//

function render() {
  time += timeDelta;

  var ms = new MatrixStack();

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Specify the viewing transformation, and use it to initialize the 
  // matrix stack

  V = translate(0.0, 0.0, -0.5*(near + far));
  ms.load(V);  

  // Create a few temporary variables to make it simpler to work with
  // the various properties we'll use to render the planets.  The Planets
  // dictionary (created in init()) can be indexed by each planet's name.
  // We'll use the temporary variables "planet" to reference the geometric
  // information (e.g., sphere model) we created in the Planets array.
  // Likewise, we'll use "data" to reference the database of information
  // about the planets in SolarSystem.  Look at how these are
  // used; it'll simplify the work you need to do.

  var name, planet, data, name2, name3, name4, name5, name6;
  
  var mCap = CapArray["cap"];
  mCap.PointMode = false;
  
  ms.push();
  ms.rotate(90,[-1,0,0]);
  ms.scale(5.2,5.2,20);
  gl.useProgram(mCap.program);
  gl.uniformMatrix4fv(mCap.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(mCap.uniforms.P, false, flatten(P));
  gl.uniform4fv(mCap.uniforms.color,[.8,1.0,1.0,1.0]);
  mCap.render();
  ms.pop();
  
  
  
  
 /* var mBody = BodyArray["body"];
  mBody.PointMode = true;
  
  ms.push();
  ms.rotate(90,[-1,0,0]);
  ms.scale(10,10,40);
  ms.translate(0,0,-.5)
  gl.useProgram(mBody.program);
  gl.uniformMatrix4fv(mBody.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(mBody.uniforms.P, false, flatten(P));
  gl.uniform4fv(mBody.uniforms.color,[1.0,0.0,0.1,0.2]);
  mBody.render();
  ms.pop();*/
  
   var mBace = BaceArray["bace1"];
  mBace.PointMode = false;
  
  ms.push();
  ms.rotate(90,[-1,0,0]);
  ms.scale(10,10,-20);
  ms.translate(0,0,1)
  gl.useProgram(mBace.program);
  gl.uniformMatrix4fv(mBace.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(mBace.uniforms.P, false, flatten(P));
  gl.uniform4fv(mBace.uniforms.color,[0.2,0.2,0.1,1.0]);
  mBace.render();
  ms.pop();
  
  var mBace = BaceArray["bace2"];
  mBace.PointMode = false;
  
  ms.push();
  ms.rotate(90,[-1,0,0]);
  ms.scale(10,10,20);
  ms.translate(0,0,-2)
  gl.useProgram(mBace.program);
  gl.uniformMatrix4fv(mBace.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(mBace.uniforms.P, false, flatten(P));
  gl.uniform4fv(mBace.uniforms.color,[0.2,0.2,0.1,1.0]);
  mBace.render();
  ms.pop();
  
  var mCap = CapArray["cap2"];
  mCap.PointMode = false;
  
  ms.push();
  ms.rotate(90,[-1,0,0]);
  ms.scale(5.3,5.3,20);
  ms.translate(9.43,0,0);
  gl.useProgram(mCap.program);
  gl.uniformMatrix4fv(mCap.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(mCap.uniforms.P, false, flatten(P));
  gl.uniform4fv(mCap.uniforms.color,[.8,1.0,1.0,1.0]);
  mCap.render();
  ms.pop();
  
  
  
  
 var mBody = BodyArray["body"];
  mBody.PointMode = true;
  
  ms.push();
  ms.rotate(90,[-1,0,0]);
  ms.scale(10,10,40);
  ms.translate(5,0,-.5)
  gl.useProgram(mBody.program);
  gl.uniformMatrix4fv(mBody.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(mBody.uniforms.P, false, flatten(P));
  gl.uniform4fv(mBody.uniforms.color,[1.0,0.0,0.1,0.2]);
  mBody.render();
  ms.pop();
  
   var mBace = BaceArray["bace3"];
  mBace.PointMode = false;
  
  ms.push();
  ms.rotate(90,[-1,0,0]);
  ms.scale(10,10,-20);
  ms.translate(5,0,1)
  gl.useProgram(mBace.program);
  gl.uniformMatrix4fv(mBace.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(mBace.uniforms.P, false, flatten(P));
  gl.uniform4fv(mBace.uniforms.color,[0.2,0.2,0.1,1.0]);
  mBace.render();
  ms.pop();
  
  var mBace = BaceArray["bace4"];
  mBace.PointMode = false;
  
  ms.push();
  ms.rotate(90,[-1,0,0]);
  ms.scale(10,10,20);
  ms.translate(5,0,-2)
  gl.useProgram(mBace.program);
  gl.uniformMatrix4fv(mBace.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(mBace.uniforms.P, false, flatten(P));
  gl.uniform4fv(mBace.uniforms.color,[0.2,0.2,0.1,1.0]);
  mBace.render();
  ms.pop();

 name = "Sun";
  planet = Planets[name];
  data = SolarSystem[name];
  
  // Set PointMode to true to render all the vertices as points, as
  // compared to filled triangles.  This can be useful if you think
  // your planet might be inside another planet or the Sun.  Since the
  // "planet" variable is set for each object, you will need to set this
  // for each planet separately.

  planet.PointMode = false;

  // Use the matrix stack to configure and render a planet.  How you rener
  // each planet will be similar, but not exactly the same.  In particular,
  // here, we're only rendering the Sun, which is the center of the Solar
  // system (and hence, has no translation to its location).

  ms.push();
  ms.rotate((1/data.year) * time, [-1,0,0]);
  ms.scale(data.radius);
  ms.translate(0,-5,0)
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
 
   name2 = "Mercury";
  planet = Planets[name2];
  data = SolarSystem[name2];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [-1,0,0]);
  ms.translate(1,-5,0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name3 = "Venus";
  planet = Planets[name3];
  data = SolarSystem[name3];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [-1,0,0]);
  ms.translate(3,-7,0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  /*
  name4 = "Earth";
  planet = Planets[name4];
  data = SolarSystem[name4];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(data.distance,0,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name5 = "Mars";
  planet = Planets[name5];
  data = SolarSystem[name5];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(data.distance,0,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  name6 = "Jupiter";
  planet = Planets[name6];
  data = SolarSystem[name6];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(data.distance,0,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

name4 = "Earth";
  planet = Planets[name4];
  data = SolarSystem[name4];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(-data.distance,0,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name5 = "Mars";
  planet = Planets[name5];
  data = SolarSystem[name5];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(-data.distance,0,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  name6 = "Jupiter";
  planet = Planets[name6];
  data = SolarSystem[name6];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(-data.distance,0,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
name4 = "Earth";
  planet = Planets[name4];
  data = SolarSystem[name4];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(0,data.distance,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name5 = "Mars";
  planet = Planets[name5];
  data = SolarSystem[name5];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(0,data.distance,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  name6 = "Jupiter";
  planet = Planets[name6];
  data = SolarSystem[name6];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(0,data.distance,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
name4 = "Earth";
  planet = Planets[name4];
  data = SolarSystem[name4];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(0,-data.distance,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name5 = "Mars";
  planet = Planets[name5];
  data = SolarSystem[name5];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(0,-data.distance,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  name6 = "Jupiter";
  planet = Planets[name6];
  data = SolarSystem[name6];
  
  
  planet.PointMode = false;

  
  ms.push();
  ms.rotate((1/data.year) * time, [0,0,1]);
  ms.translate(0,-data.distance,45);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  //
  //  Add your code for more planets here!
  //
*/
  window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 100.0; // degrees
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;