let gl = undefined;

function init() {
  let canvas = document.getElementById("webgl-canvas");
  gl = canvas.getContext("webgl2");
  if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); 
  }
  gl.clearColor(0.4, 0, 1, 0.7);
  gl.enable(gl.DEPTH_TEST);

  //initializing Cylinder
  let cyl = new Cylinder(gl, 36);
  let msCyl = new MatrixStack();
  let angleCyl = 0.0;

  //initializing Sphere
  let sphere = new Sphere(gl, 10, 12);
  let msSphere = new MatrixStack();
  let angleSphere = 0.0;

  //initializing Tetrahedron
  let tetra = new Tetrahedron(gl);
  let msTetra = new MatrixStack();
  let angleTetra = 0.0;

  render(cyl, msCyl, angleCyl, sphere, msSphere, angleSphere, tetra, msTetra, angleTetra);

};

function render(cyl, msCyl, angleCyl, sphere, msSphere, angleSphere, tetra, msTetra, angleTetra) {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //Adding Sphere
    angleSphere += -1; 
    angleSphere %= 360;

    angleCyl += 2;
    angleCyl %= 360;

    //Adding Tetrahedron
    angleTetra += 1;
    angleTetra %= 360;

    msSphere.push();
    msSphere.rotate(angleSphere, [0.5, 1, 0]);
    msSphere.scale(0.1);
    msSphere.translate(2, 6, 0);
    sphere.MV = msSphere.current();
    sphere.draw();
    msSphere.pop();



    msTetra.push();
    msTetra.rotate(angleTetra, [0.1, 0.1, 0.1]);
    msTetra.scale(0.3);
    msTetra.translate(-2, -2, 0);
    tetra.MV = msTetra.current();
    tetra.draw();
    msTetra.pop();

    //Adding Cylinder


    msCyl.push();
    msCyl.rotate(angleCyl, [-0.1, -0.1, -0.1]);
    msCyl.scale(0.1);
    msCyl.translate(1, -3, 1);
    cyl.MV = msCyl.current();
    cyl.draw();
    msCyl.pop();

    requestAnimationFrame(() => render(cyl, msCyl, angleCyl, sphere, msSphere, angleSphere, tetra, msTetra, angleTetra));
};

window.onload = init;


