const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess(config, env, {
    modifyVars: {
    	"@primary-color": "#424242",
    	"@font-size-base": "14px",
    	"@border-radius-base": "0",
    	"@btn-height-base": "32px",
      "@layout-header-background": "#101010"
    },
  });
  return config;
};