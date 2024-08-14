
lint:
	npm run lint && npm run prettier

tests:
	npm run test

e2e:
	cd e2e && npx playwright test