#version 100
precision mediump float;  // 定义浮点精度

// rasterizes a circle of radius 0.5
void circleImpl( vec4 color, float ax, float ay )
{
  float rsquared = ax*ax+ay*ay;
  float a = (0.25 - rsquared) * 4.0;
  gl_FragColor = vec4(color.rgb, color.a * ceil(a));
}
