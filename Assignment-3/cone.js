var gl = null;
var cone = null;

function init() {
    var cone = new Cone( gl );

    gl = WebGLUtils.setupWebGL( cone );
    
   
    
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
