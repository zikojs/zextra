// Hex colors
type HexDigit = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|
                'a'|'b'|'c'|'d'|'e'|'f'|
                'A'|'B'|'C'|'D'|'E'|'F';

type HexColor3 = `#${HexDigit}${HexDigit}${HexDigit}`;
// type HexColor6 = `#${HexDigit}${HexDigit}${HexDigit}${HexDigit}${HexDigit}${HexDigit}`;
type HexColor = HexColor3 
// |HexColor6;

// RGB / RGBA colors
type RgbComponent = `${number}`; // 0-255 ideally
type AlphaComponent = `${number}`; // 0-1 ideally
type RgbColor = `rgb(${RgbComponent}, ${RgbComponent}, ${RgbComponent})`;
type RgbaColor = `rgba(${RgbComponent}, ${RgbComponent}, ${RgbComponent}, ${AlphaComponent})`;

// HSL / HSLA colors
type Hue = `${number}`; // 0-360
type Percent = `${number}%`; // e.g., 50%
type HslColor = `hsl(${Hue}, ${Percent}, ${Percent})`;
type HslaColor = `hsla(${Hue}, ${Percent}, ${Percent}, ${AlphaComponent})`;

export type Color = HexColor | RgbColor | RgbaColor | HslColor | HslaColor | string;