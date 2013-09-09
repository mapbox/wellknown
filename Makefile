all: wellknown.js

wellknown.js: index.js package.json
	browserify -s wellknown index.js > wellknown.js
