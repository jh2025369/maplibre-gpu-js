fn projectLineThickness(tileY: f32) -> f32 {
    var thickness: f32 = 1.0 / circumferenceRatioAtTileY(tileY);
    if (u_projection_transition < 0.999) {
        return mix(1.0, thickness, u_projection_transition);
    } else {
        return thickness;
    }
}

fn interpolateProjection(posInTile: vec2, spherePos: vec3, elevation: f32) -> vec4 {
    var elevatedPos: vec3 = spherePos * (1.0 + elevation / GLOBE_RADIUS);
    var globePosition: vec4 = u_projection_matrix * vec4(elevatedPos, 1.0);
    
    // Z is overwritten by glDepthRange anyway - use a custom z value to clip geometry on the invisible side of the sphere.
    globePosition.z = globeComputeClippingZ(elevatedPos) * globePosition.w;

    if (u_projection_transition < 0.999) {
        var flatPosition: vec4 = u_projection_fallback_matrix * vec4(posInTile, elevation, 1.0);
        
        // Only interpolate to globe's Z for the last 50% of the animation.
        // (globe Z hides anything on the backfacing side of the planet)
        let z_globeness_threshold: f32 = 0.2;
        var result: vec4 = globePosition;
        result.z = mix(0.0, globePosition.z, clamp((u_projection_transition - z_globeness_threshold) / (1.0 - z_globeness_threshold), 0.0, 1.0));
        result.xyw = mix(flatPosition.xyw, globePosition.xyw, u_projection_transition);
        
        // Gradually hide poles during transition
        if ((posInTile.y < -32767.5) || (posInTile.y > 32766.5)) {
            result = globePosition;
            let poles_hidden_anim_percentage: f32 = 0.02; // Only draw poles in the last 2% of the animation.
            result.z = mix(globePosition.z, 100.0, pow(max((1.0 - u_projection_transition) / poles_hidden_anim_percentage, 0.0), 8.0));
        }

        return result;
    }

    return globePosition;
}

fn projectTile(posInTile: vec2) -> vec4 {
    return interpolateProjection(posInTile, projectToSphere(posInTile), 0.0);
}