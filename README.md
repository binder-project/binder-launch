## :dash: :dash: **The Binder Project is moving to a [new repo](https://github.com/jupyterhub/binderhub).** :dash: :dash:

:books: Same functionality. Better performance for you. :books:

Over the past few months, we've been improving Binder's architecture and infrastructure. We're retiring this repo as it will no longer be actively developed. Future development will occur under the [JupyterHub](https://github.com/jupyterhub/) organization.

* All development of the Binder technology will occur in the [binderhub repo](https://github.com/jupyterhub/binderhub)
* Documentation for *users* will occur in the [jupyterhub binder repo](https://github.com/jupyterhub/binder) 
* All conversations and chat for users will occur in the [jupyterhub binder gitter channel](https://gitter.im/jupyterhub/binder)

Thanks for updating your bookmarked links.

## :dash: :dash: **The Binder Project is moving to a [new repo](https://github.com/jupyterhub/binderhub).** :dash: :dash:

---

# binder-launch
Scripts for creating preconfigured Binder clusters with one command

### install
`npm install binder-launch`

### getting started using GCE

Launching a Binder cluster on GCE is the easiest way to get started (and it's also the way Binder
is running in production). Any Binder deployment will require at least 3 small compute instances,
which can get expensive if left running -- before launching the cluster, verify that the resources
being created match your budget.

#### setup

`binder-launch` contains a [script](gce/launch.js) that will configure a complete Binder cluster on 
Google Compute Engine. To use this script:
 1. Create an account on GCE, make a new project and ensure billing is set up correctly
    for that project. We'll assume this project is called 'binder-project' in the rest of the
    instructions
 2. Initialize Google Compute Engine for the new project
 3. Download the `gcloud` utility by following the instructions
    [here](https://cloud.google.com/sdk/)
 4. Log into the GCE service: `gcloud init`
 5. `gcloud config set project binder-project`

#### launch

`npm run launch`

The utility should prompt you for cluster configuration information during the launch process

*WARNING: the script will output how many compute instances it is creating, so be sure to
understand the estimated monthly cost of that cluster before leaving it running*

#### destroy

`npm run destroy`

*WARNING: check the resources that exist in your project after the destroy command has been run,
 just in case...*
