var gl = null;

function init() {
   

    var canvas = document.getElementById( "webgl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    
    cone = new Cone( gl );
    
    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
    render();
}

function render() {
    cone.render();
}

window.onload = init;
