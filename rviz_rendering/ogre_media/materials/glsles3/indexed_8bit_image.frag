#version 300 es
precision mediump int;
precision mediump float;

// 从顶点着色器传入的 UV 坐标
in vec2 UV;

// 输出到帧缓冲的片段颜色
out vec4 FragColor;

// 输入的 8 位图像纹理
uniform sampler2D eight_bit_image;

// 输入的 256x1 调色板纹理
uniform sampler2D palette;

// 透明度控制
uniform float alpha;

void main()
{
    // 从 8 位图像纹理获取亮度值
    float brightness = texture(eight_bit_image, UV).r;

    // 从 256x1 调色板纹理中查找对应颜色，使用亮度值作为采样坐标
    vec4 color = texture(palette, vec2(brightness, 0.0));

    // 输出最终颜色，结合 alpha 透明度
    FragColor = vec4(color.rgb, color.a * alpha);

    // Debug 用: 固定输出黄色
    // FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
