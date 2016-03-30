
# install ansible if not yet installed
ansible_path=$(which ansible)
if [ ! -f "$ansible_path" ] ; then
    sudo pip install ansible
fi

# install libcloud
pip install apache-libcloud

# download necessary ansible modules
ansible-galaxy install angstwad.docker_ubuntu --roles=common/roles
