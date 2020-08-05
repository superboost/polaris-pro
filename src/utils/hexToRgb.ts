function repeatHex(color: string, hex1: number, hex2: number): string {
  return color.slice(hex1, hex2).repeat(2);
}

export function hexToRgb(
  color: string
): { red: number; green: number; blue: number } {
  if (color.length === 4) {
    return {
      red: parseInt(repeatHex(color, 1, 2), 16),
      green: parseInt(repeatHex(color, 2, 3), 16),
      blue: parseInt(repeatHex(color, 3, 4), 16),
    };
  }

  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);
  return {
    red,
    green,
    blue,
  };
}
