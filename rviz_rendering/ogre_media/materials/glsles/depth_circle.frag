#version 100
precision mediump float;  // 定义浮点精度

const float minimum_alpha = 1.0 / 255.0;
uniform float alpha;
uniform float far_clip_distance;

// rasterizes a depth circle
uniform vec4 highlight;
varying vec2 v_texCoord; 

varying float depth;

vec4 packDepth()
{
  float normalized_depth = depth / far_clip_distance;
  
  // split up float into rgb components
  const vec3 shift = vec3(256.0 * 256.0, 256.0, 1.0);
  const vec3 mask = vec3(0.0, 1.0 / 256.0, 1.0 / 256.0);
  vec3 depth_packed = fract(normalized_depth * shift);
  depth_packed -= depth_packed.xxy * mask;
  
  return vec4( depth_packed.zyx, step( minimum_alpha, alpha ));
}

// rasterizes a circle of radius 0.5
void circleImpl( vec4 color, float ax, float ay )
{
  float rsquared = ax*ax+ay*ay;
  float a = (0.25 - rsquared) * 4.0;
  gl_FragColor = vec4(color.rgb, color.a * ceil(a));
}

void main()
{
    circleImpl( packDepth(), v_texCoord.x-0.5, v_texCoord.y-0.5 );
}
