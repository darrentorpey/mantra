class Mantra.Geometry
  @withinCircle: (circle, point, options = {}) ->
    _.defaults options,
      buffer: 0

    circle_radius = circle.radius + options.buffer
    distance_squared = ((circle.x - point.x) * (circle.x - point.x)) + ((circle.y - point.y) * (circle.y - point.y))
    radii_squared    = (circle_radius + point.radius) * (circle_radius + point.radius)
    distance_squared < radii_squared
