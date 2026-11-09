function toDecimalParts(value) {
  const [mantissa, exponentText = '0'] = value.toString().split('e');
  const exponent = Number(exponentText);
  const [integer, fraction = ''] = mantissa.split('.');
  let coefficient = BigInt(`${integer}${fraction}`);
  let scale = fraction.length - exponent;

  if (scale < 0) {
    coefficient *= 10n ** BigInt(-scale);
    scale = 0;
  }

  return { coefficient, scale };
}

function addDecimalParts(left, right) {
  const scale = Math.max(left.scale, right.scale);
  const leftCoefficient = left.coefficient * 10n ** BigInt(scale - left.scale);
  const rightCoefficient = right.coefficient * 10n ** BigInt(scale - right.scale);

  return { coefficient: leftCoefficient + rightCoefficient, scale };
}

function toHours(decimalParts) {
  return Number(`${decimalParts.coefficient}e-${decimalParts.scale}`);
}

class Timesheet {
  constructor() {
    this.timesheets = new Map();
  }

  submitTimesheet(projectName, hours) {
    if (typeof projectName !== 'string' || projectName.trim() === '' || !Number.isFinite(hours) || hours <= 0) {
      return false;
    }

    const normalizedProjectName = projectName.trim();
    const newHours = toDecimalParts(hours);
    const total = this.timesheets.has(normalizedProjectName)
      ? addDecimalParts(this.timesheets.get(normalizedProjectName), newHours)
      : newHours;

    if (!Number.isFinite(toHours(total))) {
      return false;
    }

    this.timesheets.set(normalizedProjectName, total);
    return true;
  }

  getTimesheets() {
    return Array.from(this.timesheets, ([projectName, hours]) => [projectName, toHours(hours)]);
  }

  getTotalTimesheetHours(projectName) {
    if (typeof projectName !== 'string') {
      return undefined;
    }

    const hours = this.timesheets.get(projectName.trim());
    return hours === undefined ? undefined : toHours(hours);
  }
}

module.exports = Timesheet;
