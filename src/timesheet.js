class Timesheet {
  submitTimesheet(projectName, hours) {
    return typeof projectName === 'string' && projectName.trim() !== '' && Number.isFinite(hours) && hours > 0;
  }
}

module.exports = Timesheet;
