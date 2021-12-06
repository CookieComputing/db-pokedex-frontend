.PHONY: run
run:
	cd pokedex && npm start

.PHONY: install-run
install-run:
	cd pokedex && npm install && npm start