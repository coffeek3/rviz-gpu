#version 100
precision mediump int;
precision mediump float;

varying vec2 UV;                     // 从顶点着色器传入的 UV 坐标
uniform sampler2D eight_bit_image;   // 输入的 8 位图像纹理
uniform sampler2D palette;           // 256x1 调色板纹理
uniform float alpha;                 // 透明度控制

void main()
{
  // 从 8 位图像纹理获取亮度值
  float brightness = texture2D(eight_bit_image, UV).x;

  // 从 256x1 调色板纹理中查找对应颜色，使用亮度值作为采样坐标
  vec4 color = texture2D(palette, vec2(brightness, 0.0));

  // 输出最终颜色，结合 alpha 透明度
  gl_FragColor = vec4(color.rgb, color.a * alpha);

  // gl_FragColor = vec4(1.0, 1.0, 0, 1);
}