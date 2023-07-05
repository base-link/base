/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import colorConvert from 'color-convert'

const colors = {
  black: '#' + colorConvert.rgb.hex([40, 40, 40]),
  black2: '#' + colorConvert.rgb.hex([90, 90, 90]),
  black3: '#' + colorConvert.rgb.hex([125, 125, 125]),
  blue: '#' + colorConvert.rgb.hex([56, 201, 247]),
  gray: '#' + colorConvert.rgb.hex([120, 120, 120]),
  gray2: '#' + colorConvert.rgb.hex([180, 180, 180]),
  gray3: '#' + colorConvert.rgb.hex([150, 150, 150]),
  green:
    '#' + colorConvert.rgb.hex(colorConvert.hsl.rgb([165, 92, 44])),
  greenLight:
    '#' + colorConvert.rgb.hex(colorConvert.hsl.rgb([165, 92, 79])),
  purple: '#' + colorConvert.rgb.hex([121, 85, 243]),
  purpleLight:
    '#' + colorConvert.rgb.hex(colorConvert.hsl.rgb([254, 87, 70])),
  red: '#' + colorConvert.rgb.hex([238, 56, 96]),
  redLight: '#f08296',
  white: '#' + colorConvert.rgb.hex([255, 255, 255]),
  white2: '#' + colorConvert.rgb.hex([244, 244, 244]),
  white3: '#' + colorConvert.rgb.hex([222, 222, 222]),
  white4: '#' + colorConvert.rgb.hex([200, 200, 200]),
  yellow: '#' + colorConvert.rgb.hex([246, 223, 104]),
}

export default colors
