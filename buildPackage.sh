#!/bin/bash
# Uncomment below if you need to see the minified version....
# export buildTarget="PROD"
PORTAL_DIR=/opt/redbox-portal
PORTAL_IMAGE=qcifengineering/redbox-portal:latest
source dev_build/buildFns.sh
sudo chown -R vagrant:vagrant *

sudo chown -R vagrant:vagrant *
cleanUpAllJs
docker run -it --rm -v $PWD:$PORTAL_DIR $PORTAL_IMAGE /bin/bash -c "cd $PORTAL_DIR; npm install -g yarn; yarn install"
#docker run -it --rm -v $PWD:/opt/rds-rdmp-portal qcifengineering/dlcf-portal:latest /bin/bash -c "cd /opt/rds-rdmp-portal; npm install;"
linkNodeLib "lodash-es" "lodash-lib"
compileAoT
docker run -it --rm -v $PWD:$PORTAL_DIR $PORTAL_IMAGE /bin/bash -c "cd $PORTAL_DIR; npm install -g yarn; yarn publish"
# Not really needed but I'm putting this in a for loop in case we want to add more arguments later
