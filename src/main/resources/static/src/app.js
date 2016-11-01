export class App {

  watchHash(that) {
     console.log(window.location.hash);
     if (window.location.hash != "") {
        let hash = window.location.hash.substring(1);
        let params = "";
        if(hash.indexOf("?") != -1) {
          params = that.extractQueryString(hash.split("?")[1]);
          hash = hash.split("?")[0];
          console.log(params);       
        }
         
        that.applyComposant(hash, params, window.location.hash);
     }
  }

  constructor() {

      let that = this;
      $(window).bind("hashchange", function() {
        that.watchHash(that);
      });


      document.body.addEventListener("makeComponentInactive", function(e) {
        that.composant.show = false;
      }, false);

      document.body.addEventListener("makeComponentActive", function(e) {
        that.composant.show = true;
      }, false);


  }

  applyComposant(hash, params, phase) {
      let show = false; 
      if (document.location.port == 9000) {
        show = true;
      }
      this.composant = { type: hash, name: phase, data: params, show: show};
      var myEvent = new CustomEvent("componentCreated");
      document.body.dispatchEvent(myEvent);
  }


  extractQueryString(params) {
    let oResult = {};
    //var oResult = [];
    let aQueryString = (params).split("&");
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
