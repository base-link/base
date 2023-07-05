/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import colorConvert from 'color-convert'

export default function generateRainbowColors(): Array<string> {
  const rainbow = []
  let i = 0
  while (i < 360) {
    const hex = '#' + colorConvert.hsl.hex([i++, 100, 69]).toUpperCase()
    rainbow.push(hex)
  }
  return rainbow
}

// https://stackoverflow.com/a/75842387/169992
export function classifyColor(
  red: number,
  green: number,
  blue: number,
) {
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const luma = 0.3 * red + 0.59 * green + 0.11 * blue
  const chroma = max - min
  const unsaturated = chroma < 0.15
  if (unsaturated) {
    if (luma < 0.1) {
      return 'black'
    }
    if (luma < 0.9) {
      return 'gray'
    }
    return 'white'
  }
  let hue_prime
  if (red == max) {
    hue_prime = (green - blue) / chroma
    if (hue_prime < 0) {
      hue_prime += 6
    }
  } else if (green == max) {
    hue_prime = (blue - red) / chroma + 2
  } else {
    hue_prime = (red - green) / chroma + 4
  }
  const hue = 60 * hue_prime
  if (hue < 17.5) {
    return 'red'
  }
  if (hue < 50) {
    return luma < 0.45 ? 'brown' : 'orange'
  }
  if (hue < 70) {
    return 'yellow'
  }
  if (hue < 165) {
    return 'green'
  }
  if (hue < 255) {
    return 'blue'
  }
  if (hue < 330) {
    return 'purple'
  }
  return 'red'
}
