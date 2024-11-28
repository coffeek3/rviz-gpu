#version 300 es
precision mediump int;
precision mediump float;

// 输入变量（attributes 替换为 in）
in vec4 a_position;    // 顶点位置
in vec2 uv0;           // 纹理坐标
in vec4 colour;        // 顶点颜色

// Uniforms
uniform mat4 worldviewproj_matrix; // 世界-视图-投影矩阵
uniform vec4 size;                 // 尺寸
uniform vec4 normal;               // 法线
uniform vec4 up;                   // 向上方向

#ifdef WITH_DEPTH
uniform mat4 worldview_matrix;     // 世界-视图矩阵
out float depth;                   // 传递给片段着色器的深度值
#endif

// 输出变量（varying 替换为 out）
out vec2 v_texCoord;    // 传递给片段着色器的纹理坐标
out vec4 v_color;       // 传递给片段着色器的颜色

void main()
{
    // 计算法线方向的右向量
    vec3 right = cross(up.xyz, normal.xyz);

    // 计算位移，基于纹理坐标和大小
    vec4 s = vec4(uv0, 0.0, 0.0) * size;
    vec3 r = s.xxx * right;
    vec3 u = s.yyy * up.xyz;

    // 计算最终顶点位置
    vec4 pos = a_position + vec4(r + u, 0.0);

    // 设置裁剪空间位置
    gl_Position = worldviewproj_matrix * pos;

    // 设置纹理坐标（加偏移）
    v_texCoord = uv0 + vec2(0.5, 0.5);

    // 将颜色传递给片段着色器
    v_color = colour;

    // 如果启用深度计算，将深度值传递给片段着色器
    #ifdef WITH_DEPTH
    vec4 pos_rel_view = worldview_matrix * pos;
    depth = -pos_rel_view.z;
    #endif
}
