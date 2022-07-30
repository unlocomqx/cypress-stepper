// for consistency, if we use CommonJS to export from this module
// we should use CommonJS convention to import other dependencies
const {
  setPluginConfigValue,
  getPluginConfigValue,
} = require('cypress-plugin-config')

function stepper() {
  let lastCmd = ''
  let lastSnapshot = ''
  let lastLogId = ''

  Cypress.on('test:after:run', () => {
    setTimeout(() => {
      let attrs = Cypress.runner.getSnapshotPropsForLogById(lastLogId)
      console.log(attrs)
      if (attrs && attrs.snapshots) {
        let snapshot = attrs.snapshots[0]

      }
    }, 500)
  })

  const createSnapshotOrig = cy.createSnapshot.bind(cy)
  cy.createSnapshot = (name, $elToHighlight, preprocessedSnapshot) => {
    const snapshot = createSnapshotOrig(name, $elToHighlight, preprocessedSnapshot)
    if (snapshot.name === "after") {
      lastSnapshot = snapshot
      // console.log(lastCmd, snapshot)
    }
    return snapshot
  }

  const addLogOrig = Cypress.runner.addLog.bind(Cypress.runner)
  Cypress.runner.addLog = (attrs, isInteractive) => {
    let result = addLogOrig(attrs, isInteractive)
    if (attrs.snapshots) {
      lastLogId = attrs.id
      console.log({lastLogId})
    }
    return result
  }

  const runCommandOriginal = cy.queue.runCommand.bind(cy.queue)
  cy.queue.runCommand = function (cmd) {
    lastCmd = cmd.attributes.id
    return runCommandOriginal(cmd)
  }
}

module.exports = { stepper }
