#version 100
precision mediump float;  // 定义浮点精度

// rasterizes a smooth square with ax, ay in [-0.5..0.5]

uniform vec4 highlight;
uniform float alpha;

varying vec2 v_texCoord;   // 从顶点着色器传递的纹理坐标
varying vec4 v_color;      // 从顶点着色器传递的颜色

void main()
{
    float ax = v_texCoord.x - 0.5;
    float ay = v_texCoord.y - 0.5;

    float blend = smoothstep(-0.48, -0.45, ay) * (1.0 - smoothstep(0.45, 0.48, ay)) *
                  smoothstep(-0.48, -0.45, ax) * (1.0 - smoothstep(0.45, 0.48, ax));
  
    float inv_blend = 1.0 - blend;
    vec3 col = blend * v_color.xyz + (sign(0.5 - length(vec3(v_color.xyz))) * vec3(0.2, 0.2, 0.2) + v_color.xyz) * inv_blend;
  
    // alternative version: make color at edge darker
    // vec3 col = (0.5 + 0.5 * blend) * v_color.xyz;
  
    col = col + col * highlight.xyz;

    gl_FragColor = vec4(col.r, col.g, col.b, alpha * v_color.a);
}
