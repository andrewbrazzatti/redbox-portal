#!/bin/bash
# Uncomment below if you need to see the minified version....
# export buildTarget="PROD"
PORTAL_DIR=/opt/redbox-portal
PORTAL_IMAGE=qcifengineering/redbox-portal:latest
source dev_build/buildFns.sh
sudo chown -R vagrant:vagrant *

docker run -it --rm -v $PWD:$PORTAL_DIR $PORTAL_IMAGE /bin/bash -c "cd $PORTAL_DIR; npm login; npm unpublish --force"
# Not really needed but I'm putting this in a for loop in case we want to add more arguments later
