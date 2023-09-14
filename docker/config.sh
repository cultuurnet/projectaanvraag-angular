#!/bin/sh

# setup config & key files
DIR="../appconfig/files/projectaanvraag/docker/angular/"
if [ -d "$DIR" ]; then
  cp -R "$DIR"/* .
else
  echo "Error: missing appconfig see docker.md prerequisites to fix this."
  exit 1
fi
