.PHONY: all watch pull build clean;
.ONESHELL: ;             # recipes execute in same shell
.NOTPARALLEL: ;          # wait for this target to finish
.EXPORT_ALL_VARIABLES: ; # send all vars to shell

UID := $(shell id -u)
GID := $(shell id -g)

all: pull build
watch: node_modules
	docker run --rm -it -p 1313:1313 -v ${PWD}:/src klakegg/hugo:ext-alpine-ci bash -c "env && hugo server"
pull:
	docker pull klakegg/hugo:ext-alpine-ci
build: node_modules
	docker run --rm -it -v ${PWD}:/src klakegg/hugo:ext-alpine-ci bash -c "hugo build --minify"
clean:
	rm -rf $(PWD)/node_modules $(PWD)/resources $(PWD)/public

node_modules:
	docker run --rm -it -p 1313:1313 -v ${PWD}:/src klakegg/hugo:ext-alpine-ci bash -c "env && npm i"