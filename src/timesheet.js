class Timesheet {
  constructor() {
    this.timesheets = new Map();
  }

  submitTimesheet(projectName, hours) {
    const isValid = typeof projectName === 'string' && projectName.trim() !== '' && Number.isFinite(hours) && hours > 0;
    if (isValid) {
      const totalHours = this.timesheets.has(projectName) ? this.timesheets.get(projectName) + hours : hours;
      this.timesheets.set(projectName, totalHours);
    }
    return isValid;
  }

  getTimesheets() {
    return Array.from(this.timesheets);
  }

  getTotalTimesheetHours(projectName) {
    return this.timesheets.get(projectName);
  }
}

module.exports = Timesheet;
