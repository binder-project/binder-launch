var async = require('async')
var some = require('lodash.some')
var prompt = require('prompt')
var gcloud = require('gcloud')

var components = [
  firewallRules,
  apiServer
]

function firewallRules (gce) {
  return {
    name: 'firewall rules',
    exists: function (cb) {
    },
    launch: function (cb) {
    },
    destroy: function (cb) {
    }
  }
}

function apiServer (gce) {
  var zone = gce.zone('us-east1-b')
  var instanceName = 'binder-api'
  return {
    name: 'api server',
    exists: function (cb) {
      zone.getVMs({ name: instanceName }, function (err, vms) {
        if (err) return cb(err)
        return cb(null, vms.length !== 0)
      })
    },
    launch: function (cb) {
      console.log('Creating/starting the API server...')
      console.log(' Finished.')
    },
    destroy: function (cb) {
      console.log('Destroying the API server...')
      console.log('Finished.')
    }
  }
}

function exists (gce, cb) {
  console.log('Checking if cluster already exists...')
  async.map(components, function (comp, next) {
    var component = comp(gce)
    component.exists(function (err, exists) {
      if (err) return next(err)
      if (exists) {
        console.log(' component:', component.name, 'exists')
      }
      return next(null, exists)
    })
  }, function (err, results) {
    if (err) return cb(err)
    return cb(null, some(results))
  })
}

function launch (config, cb) {
  console.log('Launching Binder cluster...')
  // assumes you've authenticated using the gcloud CLI utility
  var config = {
    projectId: config.projectId
  }
  var gce = gcloud().gce(config)

  exists(gce, function (err, exists) {
    if (exists) {
      return console.error('ERROR: cluster already exists -- `npm run destroy` before relaunching')
    }
    async.map(components, function (comp, next) {
      var component = comp(gce)
      component.launch(function (err) {
        return next(err)
      })
    }, function (err) {
      return cb(err)
    })
  })
}

function destroy (config, cb) {
  console.log('Destroying Binder cluster...')
  // assumes you've authenticated using the gcloud CLI utility
  var config = {
    projectId: config.projectId
  }
  var gce = gcloud().gce(config)

  exists(gce, function (err, exists) {
    if (!exists) {
      return console.error('ERROR: cluster does not exist -- cannot destroy')
    }
    async.map(components, function (comp, next) {
      var component = comp(gce)
      component.destroy(function (err) {
        return next(err)
      })
    }, function (err) {
      return cb(err)
    })
  })
}

prompt.start()
prompt.get({
  properties: {
    projectId: {
      description: 'Name of your GCE project',
      type: 'string',
      required: true
    },
    numMinions: {
      description: 'Number of Kubernetes minions to spawn',
      type: 'integer',
      default: 1,
      require: false
    }
  }
}, function (err, result) {
  prompt.start()
  prompt.get({
    properties: {
      confirm: {
        description: 'Do you wish to continue?',
        type: 'boolean',
        default: false,
        required: true
      }
    }
  }, function (err, res) {
    if (res.confirm) {
      return launch(result)
    }
    console.error('\n***************************************')
    console.error('Did not confirm -- cancelling launch...')
    console.error('\n')
  })
})
