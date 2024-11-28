#version 300 es
precision mediump int;
precision mediump float;

// 从顶点着色器传入的变量
in vec2 v_texCoord;   // 纹理坐标
in vec4 v_color;      // 顶点颜色

// Uniform 变量
uniform vec4 highlight; // 高亮因子
uniform float alpha;    // 全局透明度

// 输出片段颜色
out vec4 fragColor;

void main()
{
    float ax = v_texCoord.x - 0.5;
    float ay = v_texCoord.y - 0.5;

    // 平滑过渡的混合计算
    float blend = smoothstep(-0.48, -0.45, ay) * (1.0 - smoothstep(0.45, 0.48, ay)) *
                  smoothstep(-0.48, -0.45, ax) * (1.0 - smoothstep(0.45, 0.48, ax));
  
    float inv_blend = 1.0 - blend;

    // 根据边界调整颜色
    vec3 col = blend * v_color.xyz + 
               (sign(0.5 - length(vec3(v_color.xyz))) * vec3(0.2, 0.2, 0.2) + v_color.xyz) * inv_blend;
  
    // 高亮调整
    col = col + col * highlight.xyz;

    // 设置输出颜色
    fragColor = vec4(col.r, col.g, col.b, alpha * v_color.a);
}
