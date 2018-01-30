var gl = null;
var cone = null;

function init() {
   

    gl = WebGLUtils.setupWebGL( canvas );
    
    var cone = new Cone( gl );
    
    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 0.5, 0.1, 0.2, 0.5 );

    cone.render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
}

window.onload = init;
