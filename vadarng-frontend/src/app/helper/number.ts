// input is a string, output is a string in decimal format
export function decimalExtractor(value, prevent_e = false) {
  if (value === null || value === undefined) {
    return "";
  }

  let output = "";
  value = value
    .toString()
    .trim()
    .replace(" ", "");
  for (let i = 0; i < value.length; i++) {
    const eDigit =
      (value[i] === "e" && i > 0 && value.substring(0, i).indexOf("e") < 0) || // allow contain only one 'e'
      (value[i] === "-" &&
        value.indexOf("-") === value.indexOf("e") + 1 &&
        value.indexOf("e") > 0) || // only allow '-' right after e
      (value[i] === "+" &&
        value.indexOf("+") === value.indexOf("e") + 1 &&
        value.indexOf("e") > 0); // only allow '+' right after e
    const isNumber = !isNaN(value[i]) || (eDigit && !prevent_e);
    const onlyContainOneDot =
      value[0] !== "." &&
      value[i] === "." &&
      value.substring(0, i).indexOf(".") < 0;

    if (isNumber || onlyContainOneDot) {
      output += value[i];
    }
  }

  if (output.indexOf("e") < 0) {
    const numbers = output
      .toString()
      .trim()
      .split(".");
    // only allow 11 digt after dot because of the number will be round
    return numbers[1] !== undefined
      ? numbers[0] + "." + numbers[1].substring(0, 13)
      : output;
  }

  return removeExponents(output);
}

export function removeExponents(value) {
  const data = String(value).split(/[eE]/);
  if (String(value).indexOf("e") < 0 || data.length === 1) {
    return value;
  }

  let z = "";
  const sign = value < 0 ? "-" : "";
  const str = data[0].replace(".", "");
  let mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + "0.";
    while (mag++) {
      z += "0";
    }

    return z + str.replace(/^\-/, "");
  }

  mag -= str.length;
  while (mag--) {
    z += "0";
  }

  return str + z;
}
