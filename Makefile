lint:
	npm run lint && npm run prettier

tests:
	npm run test -- --run

.PHONY: e2e
e2e:
	cd e2e && npx playwright test