struct albedoOpacityOutParams
{
    vec3 surfaceAlbedo;
    float alpha;
};

#define pbr_inline
albedoOpacityOutParams albedoOpacityBlock(
    in vec4 vAlbedoColor
#ifdef ALBEDO
    ,in vec4 albedoTexture
    ,in vec2 albedoInfos
#endif
#ifdef OPACITY
    ,in vec4 opacityMap
    ,in vec2 vOpacityInfos
#endif
#ifdef DETAIL
    ,in vec4 detailColor
    ,in vec4 vDetailInfos
#endif
#ifdef DECAL
    ,in vec4 decalColor
    ,in vec4 vDecalInfos
#endif 
)
{
    albedoOpacityOutParams outParams;
    // _____________________________ Albedo Information ______________________________
    vec3 surfaceAlbedo = vAlbedoColor.rgb;
    float alpha = vAlbedoColor.a;

    #ifdef ALBEDO
        #if defined(ALPHAFROMALBEDO) || defined(ALPHATEST)
            alpha *= albedoTexture.a;
        #endif

        #ifdef GAMMAALBEDO
            surfaceAlbedo *= toLinearSpace(albedoTexture.rgb);
        #else
            surfaceAlbedo *= albedoTexture.rgb;
        #endif

        surfaceAlbedo *= albedoInfos.y;
    #endif

    #ifndef DECAL_AFTER_DETAIL
        #include<decalFragment>
    #endif

    #if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
        surfaceAlbedo *= vColor.rgb;
    #endif

    #ifdef DETAIL
        float detailAlbedo = 2.0 * mix(0.5, detailColor.r, vDetailInfos.y);
        surfaceAlbedo.rgb = surfaceAlbedo.rgb * detailAlbedo * detailAlbedo; // should be pow(detailAlbedo, 2.2) but detailAlbedo² is close enough and cheaper to compute
    #endif

    #ifdef DECAL_AFTER_DETAIL
        #include<decalFragment>
    #endif

    #define CUSTOM_FRAGMENT_UPDATE_ALBEDO

    // _____________________________ Alpha Information _______________________________
    #ifdef OPACITY
        #ifdef OPACITYRGB
            alpha = getLuminance(opacityMap.rgb);
        #else
            alpha *= opacityMap.a;
        #endif

        alpha *= vOpacityInfos.y;
    #endif

    #if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
        alpha *= vColor.a;
    #endif

    #if !defined(SS_LINKREFRACTIONTOTRANSPARENCY) && !defined(ALPHAFRESNEL)
        #ifdef ALPHATEST 
            #if DEBUGMODE != 88
                if (alpha < ALPHATESTVALUE)
                    discard;
            #endif

            #ifndef ALPHABLEND
                // Prevent to blend with the canvas.
                alpha = 1.0;
            #endif
        #endif
    #endif

    outParams.surfaceAlbedo = surfaceAlbedo;
    outParams.alpha = alpha;

    return outParams;
}
