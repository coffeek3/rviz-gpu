#version 300 es
precision mediump int;
precision mediump float;

// 输入顶点属性
in vec4 a_position;  // 顶点位置
in vec2 uv0;         // 纹理坐标

// 输出给片段着色器的插值变量
out vec2 v_texCoord;    // 纹理坐标
out float v_depth;      // 深度值

// 统一变量
uniform mat4 worldviewproj_matrix; // 模型视图投影矩阵
uniform mat4 worldview_matrix;     // 模型视图矩阵
uniform float far_clip_distance;   // 远剪裁面距离

void main()
{
    // 计算裁剪空间位置
    gl_Position = worldviewproj_matrix * a_position;

    // 传递纹理坐标
    v_texCoord = uv0;

    // 计算并归一化深度值
    float clip_space_depth = gl_Position.z / gl_Position.w;
    v_depth = clip_space_depth / far_clip_distance;
}
