class Timesheet {
  constructor() {
    this.timesheets = new Map();
  }

  submitTimesheet(projectName, hours) {
    const isValid = typeof projectName === 'string' && projectName.trim() !== '' && Number.isFinite(hours) && hours > 0;
    if (isValid) {
      this.timesheets.set(projectName, hours);
    }
    return isValid;
  }

  getTimesheets() {
    return Array.from(this.timesheets);
  }
}

module.exports = Timesheet;
