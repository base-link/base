/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import utfInfo from 'utf-info'

export const BIDIRECTIONAL_CLASS: Record<string, string> = {
  AL: 'Arabic Letter',
  AN: 'Arabic Number',
  B: 'Paragraph Separator',
  BN: 'Boundary Neutral',
  CS: 'Common Separator',
  EN: 'European Number',
  ES: 'European Separator',
  ET: 'European Terminator',
  FSI: 'First Strong Isolate',
  L: 'Left To Right',
  LRE: 'Left To Right Embedding',
  LRI: 'Left To Right Isolate',
  LRO: 'Left To Right Override',
  NSM: 'Nonspacing Mark',
  ON: 'Other Neutral',
  PDF: 'Pop Directional Format',
  PDI: 'Pop Directional Isolate',
  R: 'Right To Left',
  RLE: 'Right To Left Embedding',
  RLI: 'Right To Left Isolate',
  RLO: 'Right To Left Override',
  S: 'Segment Separator',
  WS: 'White Space',
}

export const COMBINING_CLASS: Record<string, string> = {
  0: 'Not Reordered',
  1: 'Overlay',
  10: 'CCC10',
  103: 'CCC103',
  107: 'CCC107',
  11: 'CCC11',
  118: 'CCC118',
  12: 'CCC12',
  122: 'CCC122',
  129: 'CCC129',
  13: 'CCC13',
  130: 'CCC130',
  132: 'CCC132',
  14: 'CCC14',
  15: 'CCC15',
  16: 'CCC16',
  17: 'CCC17',
  18: 'CCC18',
  19: 'CCC19',
  20: 'CCC20',
  202: 'Attached Below',
  21: 'CCC21',
  214: 'Attached Above',
  216: 'Attached Above Right',
  218: 'Below Left',
  22: 'CCC22',
  220: 'Below',
  222: 'Below Right',
  224: 'Left',
  226: 'Right',
  228: 'Above Left',
  23: 'CCC23',
  230: 'Above',
  232: 'Above Right',
  233: 'Double Below',
  234: 'Double Above',
  24: 'CCC24',
  240: 'Iota Subscript',
  25: 'CCC25',
  26: 'CCC26',
  27: 'CCC27',
  28: 'CCC28',
  29: 'CCC29',
  30: 'CCC30',
  31: 'CCC31',
  32: 'CCC32',
  33: 'CCC33',
  34: 'CCC34',
  35: 'CCC35',
  36: 'CCC36',
  6: 'Unnamed]',
  7: 'Nukta',
  8: 'Kana Voicing',
  84: 'CCC84',
  9: 'Virama',
  91: 'CCC91',
}

export type FontType = {
  name: string
  type: string
  weight: number
}

export const NAMED_ENTITY: Record<string, string> = {
  '&#160;': '&nbsp;',
  '&#161;': '&iexcl;',
  '&#162;': '&cent;',
  '&#163;': '&pound;',
  '&#164;': '&curren;',
  '&#165;': '&yen;',
  '&#166;': '&brvbar;',
  '&#167;': '&sect;',
  '&#168;': '&uml;',
  '&#169;': '&copy;',
  '&#170;': '&ordf;',
  '&#171;': '&laquo;',
  '&#172;': '&not;',
  '&#173;': '&shy;',
  '&#174;': '&reg;',
  '&#175;': '&macr;',
  '&#176;': '&deg;',
  '&#177;': '&plusmn;',
  '&#178;': '&sup2;',
  '&#179;': '&sup3;',
  '&#180;': '&acute;',
  '&#181;': '&micro;',
  '&#182;': '&para;',
  '&#183;': '&middot;',
  '&#184;': '&cedil;',
  '&#185;': '&sup1;',
  '&#186;': '&ordm;',
  '&#187;': '&raquo;',
  '&#188;': '&frac14;',
  '&#189;': '&frac12;',
  '&#190;': '&frac34;',
  '&#191;': '&iquest;',
  '&#192;': '&Agrave;',
  '&#193;': '&Aacute;',
  '&#194;': '&Acirc;',
  '&#195;': '&Atilde;',
  '&#196;': '&Auml;',
  '&#197;': '&Aring;',
  '&#198;': '&AElig;',
  '&#199;': '&Ccedil;',
  '&#200;': '&Egrave;',
  '&#201;': '&Eacute;',
  '&#202;': '&Ecirc;',
  '&#203;': '&Euml;',
  '&#204;': '&Igrave;',
  '&#205;': '&Iacute;',
  '&#206;': '&Icirc;',
  '&#207;': '&Iuml;',
  '&#208;': '&ETH;',
  '&#209;': '&Ntilde;',
  '&#210;': '&Ograve;',
  '&#211;': '&Oacute;',
  '&#212;': '&Ocirc;',
  '&#213;': '&Otilde;',
  '&#214;': '&Ouml;',
  '&#215;': '&times;',
  '&#216;': '&Oslash;',
  '&#217;': '&Ugrave;',
  '&#218;': '&Uacute;',
  '&#219;': '&Ucirc;',
  '&#220;': '&Uuml;',
  '&#221;': '&Yacute;',
  '&#222;': '&THORN;',
  '&#223;': '&szlig;',
  '&#224;': '&agrave;',
  '&#225;': '&aacute;',
  '&#226;': '&acirc;',
  '&#227;': '&atilde;',
  '&#228;': '&auml;',
  '&#229;': '&aring;',
  '&#230;': '&aelig;',
  '&#231;': '&ccedil;',
  '&#232;': '&egrave;',
  '&#233;': '&eacute;',
  '&#234;': '&ecirc;',
  '&#235;': '&euml;',
  '&#236;': '&igrave;',
  '&#237;': '&iacute;',
  '&#238;': '&icirc;',
  '&#239;': '&iuml;',
  '&#240;': '&eth;',
  '&#241;': '&ntilde;',
  '&#242;': '&ograve;',
  '&#243;': '&oacute;',
  '&#244;': '&ocirc;',
  '&#245;': '&otilde;',
  '&#246;': '&ouml;',
  '&#247;': '&divide;',
  '&#248;': '&oslash;',
  '&#249;': '&ugrave;',
  '&#250;': '&uacute;',
  '&#251;': '&ucirc;',
  '&#252;': '&uuml;',
  '&#253;': '&yacute;',
  '&#254;': '&thorn;',
  '&#255;': '&yuml;',
  '&#338;': '&OElig;',
  '&#339;': '&oelig;',
  '&#34;': '&quot;',
  '&#352;': '&Scaron;',
  '&#353;': '&scaron;',
  '&#376;': '&Yuml;',
  '&#38;': '&amp;',
  '&#402;': '&fnof;',
  '&#60;': '&lt;',
  '&#62;': '&gt;',
  '&#710;': '&circ;',
  '&#732;': '&tilde;',
  '&#8194;': '&ensp;',
  '&#8195;': '&emsp;',
  '&#8201;': '&thinsp;',
  '&#8204;': '&zwnj;',
  '&#8205;': '&zwj;',
  '&#8206;': '&lrm;',
  '&#8207;': '&rlm;',
  '&#8211;': '&ndash;',
  '&#8212;': '&mdash;',
  '&#8216;': '&lsquo;',
  '&#8217;': '&rsquo;',
  '&#8218;': '&sbquo;',
  '&#8220;': '&ldquo;',
  '&#8221;': '&rdquo;',
  '&#8222;': '&bdquo;',
  '&#8224;': '&dagger;',
  '&#8225;': '&Dagger;',
  '&#8226;': '&bull;',
  '&#8230;': '&hellip;',
  '&#8240;': '&permil;',
  '&#8242;': '&prime;',
  '&#8243;': '&Prime;',
  '&#8249;': '&lsaquo;',
  '&#8250;': '&rsaquo;',
  '&#8254;': '&oline;',
  '&#8260;': '&frasl;',
  '&#8364;': '&euro;',
  '&#8465;': '&image;',
  '&#8472;': '&weierp;',
  '&#8476;': '&real;',
  '&#8482;': '&trade;',
  '&#8501;': '&alefsym;',
  '&#8592;': '&larr;',
  '&#8593;': '&uarr;',
  '&#8594;': '&rarr;',
  '&#8595;': '&darr;',
  '&#8596;': '&harr;',
  '&#8629;': '&crarr;',
  '&#8656;': '&lArr;',
  '&#8657;': '&uArr;',
  '&#8658;': '&rArr;',
  '&#8659;': '&dArr;',
  '&#8660;': '&hArr;',
  '&#8704;': '&forall;',
  '&#8706;': '&part;',
  '&#8707;': '&exist;',
  '&#8709;': '&empty;',
  '&#8711;': '&nabla;',
  '&#8712;': '&isin;',
  '&#8713;': '&notin;',
  '&#8715;': '&ni;',
  '&#8719;': '&prod;',
  '&#8721;': '&sum;',
  '&#8722;': '&minus;',
  '&#8727;': '&lowast;',
  '&#8730;': '&radic;',
  '&#8733;': '&prop;',
  '&#8734;': '&infin;',
  '&#8736;': '&ang;',
  '&#8743;': '&and;',
  '&#8744;': '&or;',
  '&#8745;': '&cap;',
  '&#8746;': '&cup;',
  '&#8747;': '&int;',
  '&#8756;': '&there4;',
  '&#8764;': '&sim;',
  '&#8773;': '&cong;',
  '&#8776;': '&asymp;',
  '&#8800;': '&ne;',
  '&#8801;': '&equiv;',
  '&#8804;': '&le;',
  '&#8805;': '&ge;',
  '&#8834;': '&sub;',
  '&#8835;': '&sup;',
  '&#8836;': '&nsub;',
  '&#8838;': '&sube;',
  '&#8839;': '&supe;',
  '&#8853;': '&oplus;',
  '&#8855;': '&otimes;',
  '&#8869;': '&perp;',
  '&#8901;': '&sdot;',
  '&#8968;': '&lceil;',
  '&#8969;': '&rceil;',
  '&#8970;': '&lfloor;',
  '&#8971;': '&rfloor;',
  '&#9001;': '&lang;',
  '&#9002;': '&rang;',
  '&#913;': '&Alpha;',
  '&#914;': '&Beta;',
  '&#915;': '&Gamma;',
  '&#916;': '&Delta;',
  '&#917;': '&Epsilon;',
  '&#918;': '&Zeta;',
  '&#919;': '&Eta;',
  '&#920;': '&Theta;',
  '&#921;': '&Iota;',
  '&#922;': '&Kappa;',
  '&#923;': '&Lambda;',
  '&#924;': '&Mu;',
  '&#925;': '&Nu;',
  '&#926;': '&Xi;',
  '&#927;': '&Omicron;',
  '&#928;': '&Pi;',
  '&#929;': '&Rho;',
  '&#931;': '&Sigma;',
  '&#932;': '&Tau;',
  '&#933;': '&Upsilon;',
  '&#934;': '&Phi;',
  '&#935;': '&Chi;',
  '&#936;': '&Psi;',
  '&#937;': '&Omega;',
  '&#945;': '&alpha;',
  '&#946;': '&beta;',
  '&#947;': '&gamma;',
  '&#948;': '&delta;',
  '&#949;': '&epsilon;',
  '&#950;': '&zeta;',
  '&#951;': '&eta;',
  '&#952;': '&theta;',
  '&#953;': '&iota;',
  '&#954;': '&kappa;',
  '&#955;': '&lambda;',
  '&#956;': '&mu;',
  '&#957;': '&nu;',
  '&#958;': '&xi;',
  '&#959;': '&omicron;',
  '&#960;': '&pi;',
  '&#961;': '&rho;',
  '&#962;': '&sigmaf;',
  '&#963;': '&sigma;',
  '&#964;': '&tau;',
  '&#965;': '&upsilon;',
  '&#966;': '&phi;',
  '&#9674;': '&loz;',
  '&#967;': '&chi;',
  '&#968;': '&psi;',
  '&#969;': '&omega;',
  '&#977;': '&thetasym;',
  '&#978;': '&upsih;',
  '&#9824;': '&spades;',
  '&#9827;': '&clubs;',
  '&#9829;': '&hearts;',
  '&#982;': '&piv;',
  '&#9830;': '&diams;',
}

export type SymbolBasicType = {
  bidirectionalCategory: string | null
  block: {
    slug: string
    title: string
  }
  characterDecompositionMapping: string | null
  code: string
  combiningClasses: string | null
  comment: string | null
  decimalDigitValue: string | null
  digitValue: string | null
  generalCategory: string | null
  lowercaseMapping: string | null
  mirrored: boolean
  name: string | null
  numericValue: string | null
  slug: string
  titlecaseMapping: string | null
  unicode1Name: string | null
  uppercaseMapping: string | null
  value: number
}

export const UNICODE_CATEGORY: Record<string, string> = {
  Cc: 'Other, Control',
  Cf: 'Other, Format',
  Cn: 'Other, Not Assigned',
  Co: 'Other, Private Use',
  Cs: 'Other, Surrogate',
  Ll: 'Letter, Lowercase',
  Lm: 'Letter, Modifier',
  Lo: 'Letter, Other',
  Lt: 'Letter, Titlecase',
  Lu: 'Letter, Uppercase',
  Mc: 'Mark, Spacing Combining',
  Me: 'Mark, Enclosing',
  Mn: 'Mark, Nonspacing',
  Nd: 'Number, Decimal Digit',
  Nl: 'Number, Letter',
  No: 'Number, Other',
  Pc: 'Punctuation, Connector',
  Pd: 'Punctuation, Dash',
  Pe: 'Punctuation, Close',
  Pf: 'Punctuation, Final quote',
  Pi: 'Punctuation, Initial quote',
  Po: 'Punctuation, Other',
  Ps: 'Punctuation, Open',
  Sc: 'Symbol, Currency',
  Sk: 'Symbol, Modifier',
  Sm: 'Symbol, Math',
  So: 'Symbol, Other',
  Zl: 'Separator, Line',
  Zp: 'Separator, Paragraph',
  Zs: 'Separator, Space',
}

export function getGlyph(symbol: SymbolBasicType) {
  let glyph
  if (!symbol.generalCategory?.match(/^[CZ]/)) {
    const point = String.fromCodePoint(symbol.value)
    if (symbol.generalCategory?.match(/^Mn/)) {
      glyph = `\u25cc${point}`
    } else {
      glyph = point
    }
  }
  return glyph
}

export function getHTMLEntity(symbol: SymbolBasicType) {
  if (!symbol.generalCategory?.match(/^[CZ]/)) {
    const point = String.fromCodePoint(symbol.value)
    return `\&#${point.charCodeAt(0)};`
  }
}

export function getHTMLHexEntity(symbol: SymbolBasicType) {
  if (!symbol.generalCategory?.match(/^[CZ]/)) {
    const point = String.fromCodePoint(symbol.value)
    return `\&#x${point.charCodeAt(0).toString(16).toUpperCase()};`
  }
}

export function getNamedEntity(symbol: SymbolBasicType) {
  const entity = getHTMLEntity(symbol)
  if (entity) {
    const named = NAMED_ENTITY[entity]
    if (named) {
      return named
    }
  }
}

export function getURIEncodedValue(symbol: SymbolBasicType) {
  if (!symbol.generalCategory?.match(/^[CZ]/)) {
    return encodeURIComponent(String.fromCodePoint(symbol.value))
  }
}

export default function getSymbolData(
  symbol: SymbolBasicType,
  fonts: Array<FontType>,
) {
  const glyph = getGlyph(symbol)
  const htmlEntity = getHTMLEntity(symbol)
  const htmlHexEntity = getHTMLHexEntity(symbol)
  const uriEncodedValue = getURIEncodedValue(symbol)
  const namedEntity = getNamedEntity(symbol)
  const code = String.fromCodePoint(symbol.value)
  const utf8 = (utfInfo(code, 'utf-8')?.codeUnits.hex ?? []).map(
    (hex: string) => parseInt(hex, 16),
  )
  const utf16 = (utfInfo(code, 'utf-16')?.codeUnits.hex ?? []).map(
    (hex: string) => parseInt(hex, 16),
  )
  const utf32 = (utfInfo(code, 'utf-32')?.codeUnits.hex ?? []).map(
    (hex: string) => parseInt(hex, 16),
  )
  const combiningClasses = symbol.combiningClasses
    ?.split('')
    .filter(x => x)
    .map(code => {
      return {
        code,
        label: COMBINING_CLASS[code],
      }
    })

  const unicodeCategories = (symbol.generalCategory ?? '')
    .split(/\s*,\s*/)
    .map(code => {
      return {
        code,
        label: UNICODE_CATEGORY[code],
      }
    })

  const bidirectionalClasses = (symbol.bidirectionalCategory ?? '')
    .split(/\s*,\s*/)
    .map(code => {
      return {
        code,
        label: BIDIRECTIONAL_CLASS[code],
      }
    })

  const fontsWithStylesheets = fonts.map(font => {
    const stylesheet = `https://fonts.googleapis.com/css2?family=${font.name.replace(
      /\s+/g,
      '+',
    )}:${font.type === 'italic' ? 'ital,' : ''}wght@${
      font.weight
    }&display=swap`
    return {
      ...font,
      stylesheet,
    }
  })

  return {
    bidirectionalClasses,
    block: symbol.block,
    characterDecompositionMapping:
      symbol.characterDecompositionMapping || undefined,
    code: symbol.code,
    combiningClasses,
    comment: symbol.comment || undefined,
    decimalDigitValue: symbol.decimalDigitValue || undefined,
    digitValue: symbol.digitValue ?? undefined,
    encodings: {
      html: htmlEntity,
      htmlHex: htmlHexEntity,
      named: namedEntity,
      uri: uriEncodedValue,
      utf16,
      utf32,
      utf8,
    },
    fonts: fontsWithStylesheets,
    glyph,
    lowercaseMapping: symbol.lowercaseMapping || undefined,
    mirrored: symbol.mirrored,
    name: symbol.name || symbol.unicode1Name || undefined,
    namedEntity,
    numericValue: symbol.numericValue || undefined,
    slug: symbol.slug,
    titlecaseMapping: symbol.titlecaseMapping || undefined,
    unicode1Name: symbol.unicode1Name || undefined,
    unicodeCategories,
    uppercaseMapping: symbol.uppercaseMapping || undefined,
    value: symbol.value,
  }
}
