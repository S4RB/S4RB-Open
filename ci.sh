#!/bin/bash

function install {
   npm --prefix ./back-end --no-save install
   npm --prefix ./front-end --no-save install
}

function test {
   npm --prefix ./back-end --no-save run test:ci
   npm --prefix ./front-end --no-save run test:ci
}

function build {
   npm --prefix ./back-end --no-save run build
   npm --prefix ./front-end --no-save run build
}

function copy {
   rm -rf ./release && mkdir ./release && cp -R ./back-end/dist/* ./release && cp -R ./front-end/dist/* ./release/public
}

case "$1" in
  (install)
    install
    exit 0
    ;;
  (test)
    test
    exit 0
    ;;
  (build)
    build
    exit 0
    ;;
  (copy)
    copy
    exit 0
  ;;
  (all)
    install
    test
    build
    copy
    exit 0
    ;;
  (*)
    echo "Usage: $0 {install|test|build|copy|all}"
    exit 2
    ;;
esac
