#version 300 es
precision mediump int;
precision mediump float;

// 常量定义
const float minimum_alpha = 1.0 / 255.0;
const float alpha = 1.0;               // 如果需要动态设置，可以改为 uniform
const float far_clip_distance = 100.0; // 如果需要动态设置，可以改为 uniform

// 从顶点着色器传入的深度值
in float depth;

// 输出片段颜色
out vec4 fragColor;

// 深度打包函数
vec4 packDepth()
{
    float normalized_depth = depth / far_clip_distance;
    
    // 将浮点深度值分解为 RGB 组件
    const vec3 shift = vec3(256.0 * 256.0, 256.0, 1.0);
    const vec3 mask = vec3(0.0, 1.0 / 256.0, 1.0 / 256.0);
    vec3 depth_packed = fract(normalized_depth * shift);
    depth_packed -= depth_packed.xxy * mask;
    
    // 返回打包的深度值和 alpha 值
    return vec4(depth_packed.zyx, step(minimum_alpha, alpha));
}

void main()
{
    fragColor = packDepth(); // 输出打包后的深度值
}
