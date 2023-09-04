.PHONY: up down bash

up:
	docker-compose up -d

down:
	docker-compose down

bash:
	docker exec -it node.projectaanvraag bash
