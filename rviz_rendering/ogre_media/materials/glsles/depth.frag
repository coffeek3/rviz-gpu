#version 100
precision mediump int;
precision mediump float;
// Passes on the packed depth value

// includes
const float minimum_alpha = 1.0 / 255.0;
// uniform float alpha;
const float alpha = 1.0;
const float far_clip_distance = 100.0;
// uniform float far_clip_distance;
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

void main()
{
  gl_FragColor = packDepth();
}
