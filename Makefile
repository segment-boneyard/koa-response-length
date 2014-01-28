
test:
	@node_modules/.bin/mocha \
		--reporter spec \
		--harmony

.PHONY: test

