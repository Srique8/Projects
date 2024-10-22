/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//
//

`use strict;`

class BasicCube {

    constructor(gl, vertexShader, fragmentShader) {


        vertexShader=`
            in vec4 aPosition;
            in vec4 aColor;

            uniform mat4 P;
            uniform mat4 MV;

            out vec4 vColor;

            void main() {
                //subtracting 0.5 from each vec in the position to make the center the origin of the cube
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

            0.0, 0.0, 1.0, 
            1.0, 1.0, 1.0, 
            0.0, 1.0, 1.0, 

            //back face
            0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 1.0, 0.0,

            0.0, 0.0, 0.0,
            1.0, 1.0, 0.0,
            0.0, 1.0, 0.0,

            //top face
            0.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 0.0,

            0.0, 1.0, 1.0,
            1.0, 1.0, 0.0,
            0.0, 1.0, 0.0,

            //bottom face
            0.0, 0.0, 1.0,
            1.0, 0.0, 1.0,
            1.0, 0.0, 0.0,

            0.0, 0.0, 1.0,
            1.0, 0.0, 0.0,
            0.0, 0.0, 0.0,

            //right face
            1.0, 0.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 0.0,

            1.0, 0.0, 1.0,
            1.0, 1.0, 0.0,
            1.0, 0.0, 0.0,

            //left face
            0.0, 0.0, 1.0,
            0.0, 1.0, 1.0,
            0.0, 1.0, 0.0,

            0.0, 0.0, 1.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 0.0 

        ])

        const cubeColors = new Float32Array([
            // Front face colors
            1.0, 0.0, 0.0, 1.0,  
            0.0, 1.0, 0.0, 1.0,  
            0.0, 0.0, 1.0, 1.0,  

            1.0, 0.0, 0.0, 1.0,  
            0.0, 0.0, 1.0, 1.0,  
            1.0, 1.0, 0.0, 1.0,  

            // Back face colors
            1.0, 0.0, 1.0, 1.0,  
            0.0, 1.0, 1.0, 1.0,  
            1.0, 1.0, 1.0, 1.0,  

            1.0, 0.0, 1.0, 1.0,  
            1.0, 1.0, 1.0, 1.0,  
            0.0, 0.0, 0.0, 1.0,  

            // Top face colors
            1.0, 1.0, 0.0, 1.0,  
            0.0, 1.0, 1.0, 1.0,  
            1.0, 1.0, 1.0, 1.0,  

            1.0, 1.0, 0.0, 1.0,  
            1.0, 1.0, 1.0, 1.0,  
            0.0, 0.0, 0.0, 1.0,  

            // Bottom face colors
            1.0, 0.0, 0.0, 1.0,  
            0.0, 1.0, 0.0, 1.0,  
            0.0, 0.0, 1.0, 1.0,  

            1.0, 0.0, 0.0, 1.0,  
            0.0, 0.0, 1.0, 1.0,     
            1.0, 1.0, 0.0, 1.0,  

            // Right face colors
            0.0, 1.0, 0.0, 1.0,  
            1.0, 1.0, 0.0, 1.0,  
            1.0, 1.0, 1.0, 1.0,  

            0.0, 1.0, 0.0, 1.0,  
            1.0, 1.0, 1.0, 1.0,  
            0.0, 1.0, 1.0, 1.0,  

            // Left face colors
            1.0, 0.0, 0.0, 1.0,  
            1.0, 0.0, 1.0, 1.0,  
            0.0, 0.0, 0.0, 1.0,  

            1.0, 0.0, 0.0, 1.0,  
            0.0, 0.0, 0.0, 1.0,  
            0.0, 1.0, 1.0, 1.0  
        ]);
        
        this.position = new Attribute(gl, program, "aPosition", cubePositions, 3, gl.FLOAT);
        this.color = new Attribute(gl, program, "aColor", cubeColors, 4, gl.FLOAT);

        this.draw = () => {  

            program.use();
            
            this.position.enable();
            this.color.enable();

            gl.drawArrays(gl.TRIANGLES, 0, 36);

            this.position.disable();
            this.color.disable();
        };
         

        
    }
};
