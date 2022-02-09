let db;

const request = window.indexedDB.open("offlineDB", 2);
// new or updated db
request.onupgradeneeded = function (e) {
  db = request.result;
  store = db.createObjectStore(["transactionStore"], { autoIncrement: true });
  index = store.createIndex("transactionName", "transactionName", { unique: false });
};

// if error
request.onerror = function (e) {
  console.log("Error:", e.target);
};

// success
request.onsuccess = function (e) {
  db = request.result;
  tx = db.transaction(["transactionStore"], "readwrite");
  store = tx.objectStore("transactionStore");
  index = store.index("transactionName");

  db.onerror = function (e) {
    console.log("ERROR", e.target.errorCode);
  };
};

// save record, (invoked from failed api/transaction)
const saveRecord = (record) => {
  const transaction = db.transaction(["transactionStore"], "readwrite");
  const store = transaction.objectStore("transactionStore");
  store.add(record);
};

// Offline storage
function handleOffline(event) {
  console.log("OFFLINE");
}

function handleOnline(event) {
  console.log("ONLINE");
}

// Events
window.addEventListener("offline", handleOffline);
window.addEventListener("online", handleOnline);
