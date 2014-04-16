chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            urlContains: 'https://gerrit.spotify.net'
          }
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction()
      ]
    }]);
  });
});

function disableMinus2(tabId) {
  chrome.tabs.executeScript(tabId, {
    file: "disable-minus-2.js"
  });
}

// explicitly invoke script
chrome.pageAction.onClicked.addListener(function(tab) {
  disableMinus2(tab.id);
});

var alarmRate = 1000;
var alarmName = 'disable-minus-2';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  if (changeInfo.status !== 'complete') {
    var scheduleAlarm = function() {
      chrome.alarms.create(alarmName, {
        when: Date.now() + alarmRate
      });
    };

    chrome.alarms.onAlarm.addListener(function (alarm) {
      if (alarm.name == alarmName) {
        disableMinus2(tabId);
        scheduleAlarm();
      }
    });

    scheduleAlarm();
  }
});
