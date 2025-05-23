// samplers
uniform sampler2D textureSampler;	// original color

// uniforms
uniform float chromatic_aberration;
uniform float radialIntensity;
uniform vec2 direction;
uniform vec2 centerPosition;
uniform float screen_width;
uniform float screen_height;

// varyings
varying vec2 vUV;


#define CUSTOM_FRAGMENT_DEFINITIONS

void main(void)
{
	vec2 centered_screen_pos = vec2(vUV.x - centerPosition.x, vUV.y - centerPosition.y);
	vec2 directionOfEffect = direction;
	if(directionOfEffect.x == 0. && directionOfEffect.y == 0.){
		directionOfEffect = normalize(centered_screen_pos);
	}

	float radius2 = centered_screen_pos.x*centered_screen_pos.x
		+ centered_screen_pos.y*centered_screen_pos.y;
	float radius = sqrt(radius2);

	//index of refraction of each color channel, causing chromatic dispersion
	vec3 ref_indices = vec3(-0.3, 0.0, 0.3);
	float ref_shiftX = chromatic_aberration * pow(radius, radialIntensity) * directionOfEffect.x / screen_width;
	float ref_shiftY = chromatic_aberration * pow(radius, radialIntensity) * directionOfEffect.y / screen_height;

	// shifts for red, green & blue
	vec2 ref_coords_r = vec2(vUV.x + ref_indices.r*ref_shiftX, vUV.y + ref_indices.r*ref_shiftY*0.5);
	vec2 ref_coords_g = vec2(vUV.x + ref_indices.g*ref_shiftX, vUV.y + ref_indices.g*ref_shiftY*0.5);
	vec2 ref_coords_b = vec2(vUV.x + ref_indices.b*ref_shiftX, vUV.y + ref_indices.b*ref_shiftY*0.5);

	vec4 r = texture2D(textureSampler, ref_coords_r);
	vec4 g = texture2D(textureSampler, ref_coords_g);
	vec4 b = texture2D(textureSampler, ref_coords_b);
	float a = clamp(r.a + g.a + b.a, 0., 1.);
	gl_FragColor = vec4(r.r, g.g, b.b, a);
}