#version 300 es
precision mediump int;
precision mediump float;

// 输入的顶点属性
in vec4 position; // 顶点位置
in vec2 uv0;      // 输入的 UV 坐标

// 输入的统一变量
uniform mat4 u_MVPMatrix; // 模型-视图-投影矩阵

// 输出的插值变量
out vec2 UV; // 传递给片段着色器的 UV 坐标

void main()
{
    // 应用 MVP 矩阵进行变换
    gl_Position = u_MVPMatrix * position;

    // 传递 UV 坐标到片段着色器
    UV = uv0;
}
