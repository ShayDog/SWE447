var gl = null;
var cone = null;

function init() {
   

    gl = WebGLUtils.setupWebGL( canvas );
    
    var cone = new Cone( gl, n );
    
    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 0.0, 0.0, 0.0, 0.0 );

    cone.render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
}

window.onload = init;
