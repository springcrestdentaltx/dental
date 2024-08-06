var SmbNumberChanger = (function() {
  var hasCookie = false;

  function init(numbers) {
    if(!numbers) {
      checkForCookie();
    } else {
      checkForCookie(numbers);
      handleNumbers(numbers);
    }
  }

  function checkForCookie(numbers) {
    if(!numbers) {
      var cookieArr = document.cookie.split(';');
      var key = 'ctdata=';

      for (var i=0; i<cookieArr.length; i++) {
        if(cookieArr[i].indexOf(key) > -1) {
          var trimmedCookie = cookieArr[i].trim();
          var data = JSON.parse(trimmedCookie.substring(key.length, trimmedCookie.length));
          hasCookie = true;
          init(data);
          return;
        } 
      }

      getRewriteRules();
    } else {
      if(!hasCookie) {
        setCookie(numbers);
      }
    }
    
  }

  function getRewriteRules() {
    var s = document.createElement('script');
    var query = window.location.search.substring(1);
    var params = query.split('&');
    var vsrefdom = '';

    for (var i=0;i<params.length;i++) {
      var pair = params[i].split('=');
      if(pair[0] == '_vsrefdom') {
        vsrefdom = pair[1];
        break;
      }
    }

    if(!document.referrer && !vsrefdom) {
      init([]);
      return;
    }

    s.src = _ctRewriteUrl + '?referrer=' + document.referrer + '&_vsrefdom=' + vsrefdom + '&callback=SmbNumberChanger.init';
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  function setCookie(numbers) {
    var d = new Date();
    d.setTime(d.getTime() + 3600000)
    var expires = "expires=" + d.toUTCString();
    document.cookie = "ctdata=" + JSON.stringify(numbers) + ";" + expires + ";path=/";
  }

  function handleNumbers(numbers) {
    numbers.forEach(function(phone) {
      rewritePhoneNumbers(phone.to, phone.from);
    });
  }
  
  function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/[.\-)(]*([0-9]{3})[.\-)( ]*([0-9]{3})[.\-)( ]*([0-9]{4})/); 
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  };

  function rewritePhoneNumbers(trk, dest) {
    var regex;
    if(dest && dest !== '*') {
      regex = new RegExp("(([.\\-)(]*)[" + dest.substring(0,1) + "][" + dest.substring(1,2) + "][" + dest.substring(2,3) + "]([.\\-)( ]*)[" + dest.substring(3,4) + "][" + dest.substring(4,5) + "][" + dest.substring(5,6) + "]([.\\-)( ]*)[" + dest.substring(6,7) + "][" + dest.substring(7,8) + "][" + dest.substring(8,9) + "][" + dest.substring(9,10) + "])", "g");
    } else {
      regex = /([.\-)(]*)[0-9]{3}([.\-)( ]*)[0-9]{3}([.\-)( ]*)[0-9]{4}/g;
    }

    if (!document.body) {
      document.body = document.createElement("body").then(document.body.innerHTML = document.body.innerHTML.replace(regex, formatPhoneNumber(trk)))
    } else {
      document.body.innerHTML = document.body.innerHTML.replace(regex, formatPhoneNumber(trk)); 
    }
  }

  return {
    init: init
  }
  
})();

SmbNumberChanger.init();