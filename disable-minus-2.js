function disableMinus2() {
  var body_xpath = '//*[@id="gerrit_body"]/div/div/div/div/form/div/div[1]/table/tbody';
  var result = document.evaluate(body_xpath, document, null, XPathResult.ANY_TYPE, null);
  var body = result.iterateNext();
  if (body != undefined) {
    var nodes = body.childNodes;
    for (var i = 0; i < nodes.length; ++i) {
      var tr = nodes[i];
      var td = tr.cells[0];
      var span = td.childNodes[0];
      var input = span.childNodes[0];
      var label = span.childNodes[1];
      var text = label.innerHTML;
      if (text.indexOf('-') == 0) {
        input.disabled = true;
      }
    }
  }
}
disableMinus2();
