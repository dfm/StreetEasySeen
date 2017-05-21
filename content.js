(function () {

  "use strict";

  function parse_details ($el) {
    var name  = $el.find(".details-title").find("a")[0].text,
        price = $el.find(".price").text(),
        details = [];

    $($el.find(".details_info")[0]).find("span").each(function (i, o) {
      return details.push($(o).text());
    })

    return {name:name, price:price, details:details};
  }

  chrome.storage.local.get("se_seen", function (result) {
    var seen = {};
    if (typeof result.se_seen != "undefined") {
      seen = result.se_seen;
    }

    $(".listings>.item").each(function (i, el) {
      var $el = $(el),
          details = parse_details($el),
          prev = seen[details.name];
      if (typeof prev != "undefined") {
        $el.css("opacity", 0.3);
      }
      seen[details.name] = details;
    });

    chrome.storage.local.set({"se_seen": seen}, function () {
      console.log("saved previously seen listings");
    });
  });

})();
