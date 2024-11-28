#version 300 es
precision mediump int;
precision mediump float;

// 从顶点着色器传入的变量
in vec2 v_texCoord;   // 纹理坐标
in vec4 v_color;      // 顶点颜色

// Uniform变量
uniform vec4 highlight; // 高亮因子
uniform float alpha;    // 全局透明度

// 输出片段颜色
out vec4 fragColor;

void main()
{
    float ax = v_texCoord.x - 0.5;
    float ay = v_texCoord.y - 0.5;

    float rsquared = ax * ax + ay * ay;
    float a = (0.25 - rsquared) * 4.0;

    vec3 col = mix(vec3(0.8, 0.8, 0.8) * v_color.xyz, v_color.xyz, a);

    col = col + col * highlight.xyz;

    fragColor = vec4(col, alpha * ceil(a) * v_color.a);
}
