.PHONY: up down bash serve

up:
	docker-compose up -d

down:
	docker-compose down

bash:
	docker exec -it node.projectaanvraag bash

serve:
	docker exec -d node.projectaanvraag npm run serve:docker
