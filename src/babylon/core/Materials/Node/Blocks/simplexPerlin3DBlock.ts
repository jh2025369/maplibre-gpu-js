import { NodeMaterialBlock } from "../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets";
import { RegisterClass } from "../../../Misc/typeStore";
import { ShaderLanguage } from "../../../Materials/shaderLanguage";
/**
 * block used to Generate a Simplex Perlin 3d Noise Pattern
 */
//
//  Wombat
//  An efficient texture-free GLSL procedural noise library
//  Source: https://github.com/BrianSharpe/Wombat
//  Derived from: https://github.com/BrianSharpe/GPU-Noise-Lib
//
//  I'm not one for copyrights.  Use the code however you wish.
//  All I ask is that credit be given back to the blog or myself when appropriate.
//  And also to let me know if you come up with any changes, improvements, thoughts or interesting uses for this stuff. :)
//  Thanks!
//
//  Brian Sharpe
//  brisharpe CIRCLE_A yahoo DOT com
//  http://briansharpe.wordpress.com
//  https://github.com/BrianSharpe
//
//
//  This is a modified version of Stefan Gustavson's and Ian McEwan's work at http://github.com/ashima/webgl-noise
//  Modifications are...
//  - faster random number generation
//  - analytical final normalization
//  - space scaled can have an approx feature size of 1.0
//  - filter kernel changed to fix discontinuities at tetrahedron boundaries
//
//  Converted to BJS by Pryme8
//
//  Simplex Perlin Noise 3D
//  Return value range of -1.0->1.0
//
export class SimplexPerlin3DBlock extends NodeMaterialBlock {
    /**
     * Creates a new SimplexPerlin3DBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Neutral);
        this.registerInput("seed", NodeMaterialBlockConnectionPointTypes.Vector3);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.Float);
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "SimplexPerlin3DBlock";
    }

    /**
     * Gets the seed operand input component
     */
    public get seed(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the output component
     */
    public get output(): NodeMaterialConnectionPoint {
        return this._outputs[0];
    }

    protected override _buildBlock(state: NodeMaterialBuildState) {
        super._buildBlock(state);

        if (!this.seed.isConnected) {
            return;
        }

        if (!this._outputs[0].hasEndpoints) {
            return;
        }

        let functionString = `const float SKEWFACTOR = 1.0/3.0;\n`;
        functionString += `const float UNSKEWFACTOR = 1.0/6.0;\n`;
        functionString += `const float SIMPLEX_CORNER_POS = 0.5;\n`;
        functionString += `const float SIMPLEX_TETRAHADRON_HEIGHT = 0.70710678118654752440084436210485;\n`;
        functionString += `float SimplexPerlin3D( vec3 source ){\n`;
        functionString += `    vec3 P = source;\n`;
        functionString += `    P.x = [P.x == 0. && P.y == 0. && P.z == 0. ? 0.00001 : P.x];\n`;
        functionString += `    P *= SIMPLEX_TETRAHADRON_HEIGHT;\n`;
        functionString += `    vec3 Pi = floor( P + dot( P, vec3( SKEWFACTOR) ) );`;
        functionString += `    vec3 x0 = P - Pi + dot(Pi, vec3( UNSKEWFACTOR ) );\n`;
        functionString += `    vec3 g = step(x0.yzx, x0.xyz);\n`;
        functionString += `    vec3 l = 1.0 - g;\n`;
        functionString += `    vec3 Pi_1 = min( g.xyz, l.zxy );\n`;
        functionString += `    vec3 Pi_2 = max( g.xyz, l.zxy );\n`;
        functionString += `    vec3 x1 = x0 - Pi_1 + UNSKEWFACTOR;\n`;
        functionString += `    vec3 x2 = x0 - Pi_2 + SKEWFACTOR;\n`;
        functionString += `    vec3 x3 = x0 - SIMPLEX_CORNER_POS;\n`;
        functionString += `    vec4 v1234_x = vec4( x0.x, x1.x, x2.x, x3.x );\n`;
        functionString += `    vec4 v1234_y = vec4( x0.y, x1.y, x2.y, x3.y );\n`;
        functionString += `    vec4 v1234_z = vec4( x0.z, x1.z, x2.z, x3.z );\n`;
        functionString += `    Pi = Pi.xyz - floor(Pi.xyz * ( 1.0 / 69.0 )) * 69.0;\n`;
        functionString += `    vec3 Pi_inc1 = step( Pi, vec3( 69.0 - 1.5 ) ) * ( Pi + 1.0 );\n`;
        functionString += `    vec4 Pt = vec4( Pi.xy, Pi_inc1.xy ) + vec2( 50.0, 161.0 ).xyxy;\n`;
        functionString += `    Pt *= Pt;\n`;
        functionString += `    vec4 V1xy_V2xy = mix( Pt.xyxy, Pt.zwzw, vec4( Pi_1.xy, Pi_2.xy ) );\n`;
        functionString += `    Pt = vec4( Pt.x, V1xy_V2xy.xz, Pt.z ) * vec4( Pt.y, V1xy_V2xy.yw, Pt.w );\n`;
        functionString += `    const vec3 SOMELARGEFLOATS = vec3( 635.298681, 682.357502, 668.926525 );\n`;
        functionString += `    const vec3 ZINC = vec3( 48.500388, 65.294118, 63.934599 );\n`;
        functionString += `    vec3 lowz_mods = vec3( 1.0 / ( SOMELARGEFLOATS.xyz + Pi.zzz * ZINC.xyz ) );\n`;
        functionString += `    vec3 highz_mods = vec3( 1.0 / ( SOMELARGEFLOATS.xyz + Pi_inc1.zzz * ZINC.xyz ) );\n`;
        functionString += `    Pi_1 = [( Pi_1.z < 0.5 ) ? lowz_mods : highz_mods];\n`;
        functionString += `    Pi_2 = [( Pi_2.z < 0.5 ) ? lowz_mods : highz_mods];\n`;
        functionString += `    vec4 hash_0 = fract( Pt * vec4( lowz_mods.x, Pi_1.x, Pi_2.x, highz_mods.x ) ) - 0.49999;\n`;
        functionString += `    vec4 hash_1 = fract( Pt * vec4( lowz_mods.y, Pi_1.y, Pi_2.y, highz_mods.y ) ) - 0.49999;\n`;
        functionString += `    vec4 hash_2 = fract( Pt * vec4( lowz_mods.z, Pi_1.z, Pi_2.z, highz_mods.z ) ) - 0.49999;\n`;
        functionString += `    vec4 grad_results = inversesqrt( hash_0 * hash_0 + hash_1 * hash_1 + hash_2 * hash_2 ) * ( hash_0 * v1234_x + hash_1 * v1234_y + hash_2 * v1234_z );\n`;
        functionString += `    const float FINAL_NORMALIZATION = 37.837227241611314102871574478976;\n`;
        functionString += `    vec4 kernel_weights = v1234_x * v1234_x + v1234_y * v1234_y + v1234_z * v1234_z;\n`;
        functionString += `    kernel_weights = max(0.5 - kernel_weights, vec4(0.));\n`;
        functionString += `    kernel_weights = kernel_weights*kernel_weights*kernel_weights;\n`;
        functionString += `    return dot( kernel_weights, grad_results ) * FINAL_NORMALIZATION;\n`;
        functionString += `}\n`;

        if (state.shaderLanguage === ShaderLanguage.WGSL) {
            functionString = state._babylonSLtoWGSL(functionString);
        } else {
            functionString = state._babylonSLtoGLSL(functionString);
        }

        state._emitFunction("SimplexPerlin3D", functionString, "// SimplexPerlin3D");
        state.compilationString += state._declareOutput(this._outputs[0]) + ` = SimplexPerlin3D(${this.seed.associatedVariableName});\n`;

        return this;
    }
}

RegisterClass("BABYLON.SimplexPerlin3DBlock", SimplexPerlin3DBlock);
