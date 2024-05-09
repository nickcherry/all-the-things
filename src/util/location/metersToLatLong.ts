// https://github.com/eduardogspereira/meters-to-degrees/blob/master/src/index.js

const m1 = 111132.92;
const m2 = -559.82;
const m3 = 1.175;
const m4 = -0.0023;
const p1 = 111412.84;
const p2 = -93.5;
const p3 = 0.118;

const lonLen = (latitude: number) =>
  p1 * Math.cos(latitude) +
  p2 * Math.cos(3 * latitude) +
  p3 * Math.cos(5 * latitude);

const latLen = (latitude: number) =>
  m1 +
  m2 * Math.cos(2 * latitude) +
  m3 * Math.cos(4 * latitude) +
  m4 * Math.cos(6 * latitude);

const deg2rad = (degrees: number) => (degrees * (2.0 * Math.PI)) / 360;

const lonDegrees = (degrees: number, meters: number) =>
  meters / lonLen(deg2rad(degrees));
const latDegrees = (degrees: number, meters: number) =>
  meters / latLen(deg2rad(degrees));

function metersToLatLong({
  latitude,
  longitude,
  meters,
}: {
  latitude: number;
  longitude: number;
  meters: number;
}) {
  return {
    latitude: latDegrees(latitude, meters),
    longitude: lonDegrees(longitude, meters),
  };
}

export { metersToLatLong };
