#version 300 es
precision mediump int;
precision mediump float;

const float minimum_alpha = 1.0 / 255.0;

// 输入的统一变量
uniform float alpha;
uniform float far_clip_distance;
uniform vec4 highlight;

// 从顶点着色器传入的插值变量
in vec2 v_texCoord; 
in float depth;

// 输出颜色
out vec4 fragColor;

// 打包深度到 RGB 格式
vec4 packDepth()
{
    float normalized_depth = depth / far_clip_distance;

    // 分解浮点数到 RGB 组件
    const vec3 shift = vec3(256.0 * 256.0, 256.0, 1.0);
    const vec3 mask = vec3(0.0, 1.0 / 256.0, 1.0 / 256.0);
    vec3 depth_packed = fract(normalized_depth * shift);
    depth_packed -= depth_packed.xxy * mask;

    return vec4(depth_packed.zyx, step(minimum_alpha, alpha));
}

// 渲染一个半径为 0.5 的圆形
void circleImpl(vec4 color, float ax, float ay)
{
    float rsquared = ax * ax + ay * ay;
    float a = (0.25 - rsquared) * 4.0;
    fragColor = vec4(color.rgb, color.a * ceil(a));
}

void main()
{
    circleImpl(packDepth(), v_texCoord.x - 0.5, v_texCoord.y - 0.5);
    // fragColor = vec4(1.0, 0.0, 0.0, 1.0); // 调试输出
}
