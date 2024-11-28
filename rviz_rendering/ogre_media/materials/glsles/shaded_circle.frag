#version 100
precision mediump int;
precision mediump float;

// rasterizes a circle that is darker at the borders than in the center

varying vec2 v_texCoord;   // 从顶点着色器传入的纹理坐标
varying vec4 v_color;      // 从顶点着色器传入的颜色

uniform vec4 highlight;
uniform float alpha;

void main()
{
    float ax = v_texCoord.x - 0.5;
    float ay = v_texCoord.y - 0.5;

    float rsquared = ax * ax + ay * ay;
    float a = (0.25 - rsquared) * 4.0;

    vec3 col = mix(vec3(0.8, 0.8, 0.8) * v_color.xyz, v_color.xyz, a);

    col = col + col * highlight.xyz;
    
    gl_FragColor = vec4(col, alpha * ceil(a) * v_color.a);
    // gl_FragColor = vec4(1.0,0,0,1);
}
