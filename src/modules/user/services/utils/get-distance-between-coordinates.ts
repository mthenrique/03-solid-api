export interface ICoordinates {
  latitude: number
  longitude: number
}
export function getDistanceBetweenCoordinates(from: ICoordinates, to: ICoordinates) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromLatitudeInRadian = (from.latitude * Math.PI) / 180
  const toLatitudeInRadian = (to.latitude * Math.PI) / 180

  const theta = from.longitude - to.longitude
  const thetaInRadian = (theta * Math.PI) / 180

  let distance = Math.sin(fromLatitudeInRadian) * Math.sin(toLatitudeInRadian) +
    Math.cos(fromLatitudeInRadian) * Math.cos(toLatitudeInRadian) *
    Math.cos(thetaInRadian)

  if (distance > 1) {
    distance = 1
  }

  distance = Math.acos(distance)
  distance = (distance * 180) / Math.PI
  distance = distance * 60 * 1.1515

  return distance
}