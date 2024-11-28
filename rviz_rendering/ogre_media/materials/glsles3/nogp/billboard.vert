#version 300 es
precision mediump int;
precision mediump float;

// Uniforms
uniform mat4 worldviewproj_matrix;
uniform vec4 camera_pos;
uniform vec4 size;
uniform vec4 auto_size;

#ifdef WITH_DEPTH
uniform mat4 worldview_matrix;
out float depth; // 传递给片段着色器的深度
#endif

// 顶点属性
layout(location = 0) in vec4 a_position; // 顶点位置
layout(location = 1) in vec2 uv0;        // 纹理坐标
layout(location = 2) in vec4 colour;     // 顶点颜色

// 传递给片段着色器
out vec2 v_texCoord;
out vec4 v_color;

void main()
{
    vec3 at = camera_pos.xyz - a_position.xyz;
    at = normalize(at);
    vec3 right = cross(vec3(0.0, 1.0, 0.0), at);
    vec3 up = cross(at, right);
    right = normalize(right);
    up = normalize(up);

    // 计算大小因子
    vec4 size_factor = (1.0 - auto_size.x + (auto_size.x * a_position.z)) * size;

    // 计算顶点偏移
    vec4 s = vec4(uv0, 0.0, 0.0) * size_factor;
    vec3 r = s.xxx * right;
    vec3 u = s.yyy * up;

    // 计算最终位置
    vec4 pos = a_position + vec4(r + u, 0.0);

    // 输出最终的顶点位置
    gl_Position = worldviewproj_matrix * pos;

    // 将纹理坐标和颜色传递给片段着色器
    v_texCoord = uv0 + vec2(0.5, 0.5);
    v_color = colour;

#ifdef WITH_DEPTH
    vec4 pos_rel_view = worldview_matrix * pos;
    depth = -pos_rel_view.z; // 深度传递
#endif
}
