#version 100
precision mediump float;  // 定义浮点精度

// Draws an 8-bit image using RGB values from a 256x1 palette texture.

varying vec2 UV;
uniform sampler2D eight_bit_image;
uniform sampler2D palette;  // 改为 sampler2D
uniform float alpha;

void main()
{
  // 获取 8 位图像中的亮度值
  float brightness = texture2D(eight_bit_image, UV).x;
  
  // The 0.999 multiply is needed because brightness value 255 comes
  // out of texture2D() as 1.0, which wraps around to 0.0 in the
  // palette texture.
    // 在 2D 调色板纹理中查找对应的颜色
  vec4 color = texture2D(palette, vec2(brightness, 0.5));

  // 应用 alpha 并设置最终颜色
  gl_FragColor = vec4(color.rgb, color.a * alpha);
}
