// import convert from 'color-convert'
// import Color2 from 'color'
// import TinyColor2 from 'tinycolor2'
// import Color from 'colorjs.io'
// // perform().catch(console.error)
// // colorjs.io/docs/interpolation.html
// // https://www.npmjs.com/package/@kevinrodriguez-io/pigment-core
// export function getPageInfo(value: string, i: number) {
//   const kind = 'Color'
//   const color = new Color(value)
//   const color2 = Color2(value)

//   const page = {
//     data: {
//       analogous: c2
//         .analogous()
//         .map(x => x.toHexString().replace('#', '').toLowerCase()),
//       ansi16: convert.hex.ansi16(color2.hex()),
//       ansi256: convert.hex.ansi256(color2.hex()),
//       apple: convert.hex.apple(color2.hex()),
//       cmyk: convert.hex.cmyk(color2.hex()),
//       complement: c2
//         .complement()
//         .toHexString()
//         .replace('#', '')
//         .toLowerCase(),
//       gray: convert.hex.gray(color2.hex()),
//       hcg: convert.hex.hcg(color2.hex()),
//       hex: color2.hex,
//       hsl: color.hsl,
//       hsv: color.hsv,
//       hwb: color.hwb,
//       isDark: color2.isDark(),
//       isLight: color2.isLight(),
//       keyword: convert.hex.keyword(color2.hex()),
//       // xxy: space.rgb.yxy(rgb),
//       lab: color.lab,
//       luminosity: color2.luminosity(),
//       monochromatic: c2
//         .monochromatic()
//         .map(x => x.toHexString().replace('#', '').toLowerCase()),
//       // negate: c.negate(),
//       name: c2.toName(),
//       oklab: color.oklab,
//       pentad: [
//         c2
//           .spin((360 / 5) * 0)
//           .toString()
//           .replace('#', '')
//           .toLowerCase(),
//         c2
//           .spin((360 / 5) * 1)
//           .toString()
//           .replace('#', '')
//           .toLowerCase(),
//         c2
//           .spin((360 / 5) * 2)
//           .toString()
//           .replace('#', '')
//           .toLowerCase(),
//         c2
//           .spin((360 / 5) * 3)
//           .toString()
//           .replace('#', '')
//           .toLowerCase(),
//         c2
//           .spin((360 / 5) * 4)
//           .toString()
//           .replace('#', '')
//           .toLowerCase(),
//       ],
//       splitcomplement: c2
//         .splitcomplement()
//         .map(x => x.toHexString().replace('#', '').toLowerCase()),
//       tetrad: c2
//         .tetrad()
//         .map(x => x.toHexString().replace('#', '').toLowerCase()),
//       triad: c2
//         .triad()
//         .map(x => x.toHexString().replace('#', '').toLowerCase()),
//       xyz: color.xyz,
//     },
//     title: `Color ${color}`,
//   }

//   try {
//     console.log(`Saved ${color}.`)
//   } catch (e) {
//     console.log(e)
//     process.exit()
//   }
// }
const colors = {}

export default colors
