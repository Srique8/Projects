/////////////////////////////////////////////////////////////////////////////
//
//  ExperimentalCube.js
//
//  A cube defined ???
//

class ExperimentalCube {
    constructor(gl, vertexShader, fragmentShader) {
        vertexShader=`
            in vec4 aPosition;
            in vec4 aColor;

            uniform mat4 P;
            uniform mat4 MV;

            out vec4 vColor;

            void main() {
                gl_Position = P * MV * aPosition;
                vColor = aColor;
            }
        `;

        fragmentShader=`
            precision mediump float;

            in vec4 vColor;
            out vec4 fColor;

            void main() {
                fColor = vColor;
            }
        `;

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        // Define the positions for the vertices in a single triangle strip, with degenerate triangles
        const cubePositions = new Float32Array([
            // Front face (counterclockwise)
            -0.5, -0.5,  0.5,  // 0 bottom-left
             0.5, -0.5,  0.5,  // 1 bottom-right
            -0.5,  0.5,  0.5,  // 3 top-left
             0.5,  0.5,  0.5,  // 2 top-right

            // Right face
             0.5, -0.5,  0.5,  // 1 bottom-left (same as before)
             0.5, -0.5, -0.5,  // 5 bottom-right
             0.5,  0.5,  0.5,  // 2 top-left (same as before)
             0.5,  0.5, -0.5,  // 6 top-right

            // Back face
             0.5, -0.5, -0.5,  // 5 bottom-left (same as before)
            -0.5, -0.5, -0.5,  // 4 bottom-right
             0.5,  0.5, -0.5,  // 6 top-left (same as before)
            -0.5,  0.5, -0.5,  // 7 top-right

            // Left face
            -0.5, -0.5, -0.5,  // 4 bottom-left (same as before)
            -0.5, -0.5,  0.5,  // 0 bottom-right (same as before)
            -0.5,  0.5, -0.5,  // 7 top-left (same as before)
            -0.5,  0.5,  0.5,  // 3 top-right (same as before)

            // Top face
            -0.5,  0.5,  0.5,  // 3 bottom-left (same as before)
             0.5,  0.5,  0.5,  // 2 bottom-right (same as before)
            -0.5,  0.5, -0.5,  // 7 top-left (same as before)
             0.5,  0.5, -0.5,  // 6 top-right (same as before)

            // Bottom face
            -0.5, -0.5, -0.5,  // 4 bottom-left (same as before)
             0.5, -0.5, -0.5,  // 5 bottom-right (same as before)
            -0.5, -0.5,  0.5,  // 0 top-left (same as before)
             0.5, -0.5,  0.5   // 1 top-right (same as before)
        ]);

        // Define colors for each vertex (can assign unique colors)
        const cubeColors = new Float32Array([
            1.0, 0.0, 0.0, 1.0,  // Red
            0.0, 1.0, 0.0, 1.0,  // Green
            0.0, 0.0, 1.0, 1.0,  // Blue
            1.0, 1.0, 0.0, 1.0,  // Yellow
            1.0, 0.0, 1.0, 1.0,  // Magenta
            0.0, 1.0, 1.0, 1.0,  // Cyan
            1.0, 1.0, 1.0, 1.0,  // White
            0.0, 0.0, 0.0, 1.0,  // Black
            // Repeat colors for degenerate transitions
            1.0, 0.0, 0.0, 1.0,  // Red
            0.0, 1.0, 0.0, 1.0,  // Green
            0.0, 0.0, 1.0, 1.0,  // Blue
            1.0, 1.0, 0.0, 1.0   // Yellow
        ]);

       
        this.position = new Attribute(gl, program, "aPosition", cubePositions, 3, gl.FLOAT);
        this.color = new Attribute(gl, program, "aColor", cubeColors, 4, gl.FLOAT);

        this.draw = () => {
            program.use();

            this.position.enable();
            this.color.enable();

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, cubePositions.length / 3);

            this.position.disable();
            this.color.disable();
        };
    }
};
