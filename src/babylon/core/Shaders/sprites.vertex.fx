﻿// Attributes
attribute vec4 position;
attribute vec2 options;
attribute vec2 offsets;
attribute vec2 inverts;
attribute vec4 cellInfo;
attribute vec4 color;

// Uniforms
uniform mat4 view;
uniform mat4 projection;

// Output
varying vec2 vUV;
varying vec4 vColor;

#include<fogVertexDeclaration>
#include<logDepthDeclaration>


#define CUSTOM_VERTEX_DEFINITIONS

void main(void) {

#define CUSTOM_VERTEX_MAIN_BEGIN
	
	vec3 viewPos = (view * vec4(position.xyz, 1.0)).xyz; 
	vec2 cornerPos;
	
	float angle = position.w;
	vec2 size = vec2(options.x, options.y);
	vec2 offset = offsets.xy;

	cornerPos = vec2(offset.x - 0.5, offset.y  - 0.5) * size;

	// Rotate
	vec3 rotatedCorner;
	rotatedCorner.x = cornerPos.x * cos(angle) - cornerPos.y * sin(angle);
	rotatedCorner.y = cornerPos.x * sin(angle) + cornerPos.y * cos(angle);
	rotatedCorner.z = 0.;

	// Position
	viewPos += rotatedCorner;
	gl_Position = projection * vec4(viewPos, 1.0);   

	// Color
	vColor = color;
	
	// Texture
	vec2 uvOffset = vec2(abs(offset.x - inverts.x), abs(1.0 - offset.y - inverts.y));
	vec2 uvPlace = cellInfo.xy;
	vec2 uvSize = cellInfo.zw;

	vUV.x = uvPlace.x + uvSize.x * uvOffset.x;
	vUV.y = uvPlace.y + uvSize.y * uvOffset.y;

	// Fog
#ifdef FOG
	vFogDistance = viewPos;
#endif

#include<logDepthVertex>

#define CUSTOM_VERTEX_MAIN_END
}