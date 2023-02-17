normal := \e[0m
bold := \e[1m
grey := \e[2m

node_version := 18

all: list

list:
	@printf "$(bold)npm_install_all$(grey) - Install npm packages dependencies for all services\n$(normal)"
	@printf "$(bold)npm_update_all$(grey) - Update npm packages dependencies for all services\n$(normal)"
	@printf "$(bold)npm_i_app$(grey) - Install npm packages dependencies for wax service\n$(normal)"
	@printf "$(bold)npm_update_app$(grey) - Update npm packages dependencies for wax service\n$(normal)"
	@printf "$(bold)build_docker_image$(grey) - Build docker image with node\n$(normal)"
	@printf "$(bold)build_docker_image_alpine$(grey) - Build docker image with alpine\n$(normal)"

npm_install_all: npm_i_app
npm_update_all: npm_update_app

npm_i_app:
	docker run -it --rm -v ${PWD}/app:/app -w /app node:$(node_version) npm install

npm_update_app:
	docker run -it --rm -v ${PWD}/app:/app -w /app node:$(node_version) npm update -D

build_docker_image:
	docker buildx build -f ./docker/Dockerfile-node -t mailbee .

build_docker_image_alpine:
	docker buildx build -f ./docker/Dockerfile-node-alpine -t mailbee .