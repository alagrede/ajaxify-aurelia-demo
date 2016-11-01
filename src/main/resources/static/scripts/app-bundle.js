define('app',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class App {

    watchHash(that) {
      console.log(window.location.hash);
      if (window.location.hash != "") {
        let hash = window.location.hash.substring(1);
        let params = "";
        if (hash.indexOf("?") != -1) {
          params = that.extractQueryString(hash.split("?")[1]);
          hash = hash.split("?")[0];
          console.log(params);
        }

        that.applyComposant(hash, params, window.location.hash);
      }
    }

    constructor() {

      let that = this;
      $(window).bind("hashchange", function () {
        that.watchHash(that);
      });

      document.body.addEventListener("makeComponentInactive", function (e) {
        that.composant.show = false;
      }, false);

      document.body.addEventListener("makeComponentActive", function (e) {
        that.composant.show = true;
      }, false);
    }

    applyComposant(hash, params, phase) {
      let show = false;
      if (document.location.port == 9000) {
        show = true;
      }
      this.composant = { type: hash, name: phase, data: params, show: show };
      var myEvent = new CustomEvent("componentCreated");
      document.body.dispatchEvent(myEvent);
    }

    extractQueryString(params) {
      let oResult = {};
      //var oResult = [];
      let aQueryString = params.split("&");
      if (aQueryString != "") {
        for (var i = 0; i < aQueryString.length; i++) {
          let aTemp = aQueryString[i].split("=");
          if (aTemp[1].length > 0) {
            oResult[aTemp[0]] = unescape(aTemp[1]);
            //oResult.push(aTemp[0]);
          }
        }
      }
      return oResult;
    }

  }
  exports.App = App;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  //Configure Bluebird Promises.
  //Note: You may want to use environment-specific configuration.
  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot());
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    //config.globalResources([]);
  }
});
define('widgets/component1',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class Component1 {
        constructor() {
            this.message = "Hello component 1";
        }
    }
    exports.Component1 = Component1;
});
define('widgets/component2',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class Default {
        constructor() {
            this.message = "Hello component 2";
        }
    }
    exports.Default = Default;
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <compose id=\"myComponent\" show.bind=\"composant.show == true\" if.bind=\"composant != null\" view-model=\"./widgets/${composant.type}\" model.bind=\"composant\"></compose>\n</template>\n"; });
define('text!widgets/component1.html', ['module'], function(module) { module.exports = "<template>\n    <h1>${message}</h1>\n</template>"; });
define('text!widgets/component2.html', ['module'], function(module) { module.exports = "<template>\n    <h1>${message}</h1>\n    <input value.bind=\"message\" type=\"text\">\n</template>"; });
//# sourceMappingURL=app-bundle.js.map