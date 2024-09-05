// GLSL ES 2.0 顶点着色器
#version 100
precision mediump float;  // 定义浮点精度

// 输入顶点位置和纹理坐标
attribute vec4 a_position;  // 顶点位置
attribute vec2 a_texCoord;  // 纹理坐标

// 用于传递给片段着色器的varying变量
varying vec2 v_texCoord;    // 插值后的纹理坐标
varying float v_depth;      // 深度值

// 统一变量，模型视图投影矩阵
uniform mat4 worldviewproj_matrix;
uniform mat4 worldview_matrix;   // 模型视图投影矩阵
uniform float far_clip_distance;  // 远剪裁面距离

void main()
{
    // 将顶点位置变换到裁剪空间
    gl_Position = worldviewproj_matrix * a_position;

    // 将纹理坐标传递给片段着色器
    v_texCoord = a_texCoord;

    // 计算深度值并将其传递给片段着色器
    v_depth = gl_Position.z / gl_Position.w;

    // 将深度值归一化到0到1的范围
    v_depth = v_depth / far_clip_distance;
}
