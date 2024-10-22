/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
    constructor(gl, vertexShader, fragmentShader) {
        vertexShader=`
            in vec4 aPosition;
            in vec4 aColor;

            uniform mat4 P;
            uniform mat4 MV;

            out vec4 vColor;

            void main() {
                vec4 adjustedPosition = aPosition - vec4(0.5, 0.5, 0.5, 0.0);
                gl_Position = P * MV * adjustedPosition;
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

        const cubePositions = new Float32Array([
            //front face
            0.0, 0.0, 1.0,
            1.0, 0.0, 1.0,
            1.0, 1.0, 1.0,
            0.0, 1.0, 1.0,

            //back face
            0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 1.0, 0.0,
            0.0, 1.0, 0.0
        ])

        const cubeColors = new Float32Array([
            //front face
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 0.0, 1.0,

            //back face
            1.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            0.0, 0.0, 0.0, 1.0
        ])

        const cubeIndices = new Uint16Array([
            //front face
            0, 1, 2,
            0, 2, 3,

            //back face
            4, 5, 6,
            4, 6, 7,

            //top face
            3, 2, 6,
            3, 6, 7,

            //bottom face
            0, 1, 5,
            0, 5, 4,

            //right face
            1, 2, 6,
            1, 6, 5,

            //left face
            0, 3, 7,
            0, 7, 4
        ])

        this.position = new Attribute(gl, program, "aPosition", cubePositions, 3, gl.FLOAT);
        this.color = new Attribute(gl, program, "aColor", cubeColors, 4, gl.FLOAT);

        this.indices = new Indices(gl, cubeIndices);


        this.draw = () => {
            program.use();

            this.position.enable();
            this.color.enable();

            this.indices.enable();

            gl.drawElements(gl.TRIANGLES, this.indices.count, this.indices.type, 0)

            this.indices.disable();

            this.position.disable();
            this.color.disable();


        };
    }
};
