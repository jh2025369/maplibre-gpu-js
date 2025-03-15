struct FragmentInput {
    @location(0) v_color_: vec4f,
}

@fragment
fn main(input: FragmentInput) -> @location(0) vec4f {
    var fragColor: vec4f = input.v_color_;

#ifdef OVERDRAW_INSPECTOR
    fragColor = vec4(1.0);
#endif

    return fragColor;
}
