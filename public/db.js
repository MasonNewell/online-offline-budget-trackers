const request = window.indexedDB.open("offlineDB", 1);
// new or updated db
request.onupgradeneeded = function (e) {
  let db = request.result,
    store = db.createObjectStore("transactionStore", { autoIncrement: true });
  index = store.createIndex("transactionName", "transactionName", { unique: false });
};

// if error
request.onerror = function (e) {
  console.log("Error:", e.target);
};

// success
request.onsuccess = function (e) {
  db = request.result;
  tx = db.transaction("transactionStore", "readwrite");
  store = tx.objectStore("transactionStore");
  index = store.index("transactionName");

  db.onerror = function (e) {
    console.log("ERROR", e.target.errorCode);
  };
  store.put({ transtionName: "tester", amount: 1 });
  //   store.add({ transactionName: "testerAdd", amount: 222 });
};

// Offline storage
function handleOffline(event) {
  console.log("OFFLINE");

  // Open database
  //   const db = await openDB("offlineBudget", 1, {
  //     upgrade(db, oldVersion, newVersion, transaction) {},
  //   });
}

// google's
//   create object store
// var dbPromise = idb.openDB("test-db", 1, function (upgradeDb) {
//   if (!upgradeDb.objectStoreNames.contains("store")) {
//     upgradeDb.createObjectStore("transaction", { autoIncrement: true });
//     upgradeDb.createObjectStore("amount", { autoIncrement: true });
//   }
// });

function handleOnline(event) {
  console.log("ONLINE");
}

// Events
window.addEventListener("offline", handleOffline);
window.addEventListener("online", handleOnline);
