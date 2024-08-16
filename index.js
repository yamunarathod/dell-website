// // // const express = require("express");
// // // const app = express();
// // // const sqlite3 = require("sqlite3").verbose();

// // // const port = 3000;

// // // let pageCount = 0;

// // // app.set("view engine", "ejs");
// // // app.use(express.static("public"));

// // // let db = new sqlite3.Database("./pageCount.db", (err) => {
// // //   if (err) {
// // //     console.error(err.message);
// // //   }
// // //   console.log("Connected to the SQLite database.");
// // // });

// // // // Create a table to store the page count
// // // db.run(`CREATE TABLE IF NOT EXISTS count (
// // //   id INTEGER PRIMARY KEY AUTOINCREMENT,
// // //   page_count INTEGER
// // // )`);

// // // // Initialize pageCount from the database
// // // db.get(`SELECT page_count FROM count ORDER BY id DESC LIMIT 1`, (err, row) => {
// // //   if (err) {
// // //     console.error(err.message);
// // //   }
// // //   if (row) {
// // //     pageCount = row.page_count;
// // //   }
// // // });

// // // app.get("/", (req, res) => {
// // //   pageCount++;
// // //   // Update pageCount in the database
// // //   db.run(
// // //     `INSERT INTO count (page_count) VALUES (?)`,
// // //     [pageCount],
// // //     function (err) {
// // //       if (err) {
// // //         return console.error(err.message);
// // //       }
// // //       console.log(`Page count updated to ${pageCount}`);
// // //     }
// // //   );

// // //   res.render("index");
// // // });

// // // app.get("/count", (req, res) => {
// // //   res.render("count", { pageCount });
// // // });

// // // app.get("/about", (req, res) => {
// // //   res.render("about");
// // // });

// // // app.listen(port, () => {
// // //   console.log(`App listening at http://localhost:${port}`);
// // // });


// // const express = require("express");
// // const app = express();
// // const sqlite3 = require("sqlite3").verbose();
// // const port = 3000;

// // app.set("view engine", "ejs");
// // app.use(express.static("public"));

// // let db = new sqlite3.Database("./pageCount.db", (err) => {
// //   if (err) {
// //     console.error(err.message);
// //   }
// //   console.log("Connected to the SQLite database.");
// // });

// // // Create a table to store the page count
// // db.run(`CREATE TABLE IF NOT EXISTS count (
// //   id INTEGER PRIMARY KEY AUTOINCREMENT,
// //   page_count INTEGER
// // )`);

// // // Initialize pageCount from the database
// // let pageCount = 0;
// // db.get(`SELECT page_count FROM count ORDER BY id DESC LIMIT 1`, (err, row) => {
// //   if (err) {
// //     console.error(err.message);
// //   }
// //   if (row) {
// //     pageCount = row.page_count;
// //   } else {
// //     // If no rows exist, initialize with 0
// //     db.run(`INSERT INTO count (page_count) VALUES (0)`);
// //   }
// // });

// // app.get("/", (req, res) => {
// //   // Increment the page count
// //   pageCount++;
  
// //   // Update the page count in the database
// //   db.run(`UPDATE count SET page_count = ? WHERE id = (SELECT id FROM count ORDER BY id DESC LIMIT 1)`, [pageCount], function (err) {
// //     if (err) {
// //       return console.error(err.message);
// //     }
// //     console.log(`Page count updated to ${pageCount}`);
// //   });

// //   res.render("index");
// // });

// // app.get("/count", (req, res) => {
// //   // Get the latest page count from the database
// //   db.get(`SELECT page_count FROM count ORDER BY id DESC LIMIT 1`, (err, row) => {
// //     if (err) {
// //       return console.error(err.message);
// //     }
// //     let latestCount = row ? row.page_count : 0;
// //     res.render("count", { pageCount: latestCount });
// //   });
// // });

// // app.get("/about", (req, res) => {
// //   res.render("about");
// // });

// // app.listen(port, () => {
// //   console.log(`App listening at http://localhost:${port}`);
// // });


// const express = require("express");
// const app = express();
// const sqlite3 = require("sqlite3").verbose();
// const http = require("http");
// const { Server } = require("socket.io");

// const port = 3000;

// // Create HTTP server and integrate with Socket.IO
// const server = http.createServer(app);
// const io = new Server(server);

// app.set("view engine", "ejs");
// app.use(express.static("public"));

// let db = new sqlite3.Database("./pageCount.db", (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log("Connected to the SQLite database.");
// });

// // Create a table to store the page count
// db.run(`CREATE TABLE IF NOT EXISTS count (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   page_count INTEGER
// )`);

// // Initialize pageCount from the database
// let pageCount = 0;
// db.get(`SELECT page_count FROM count ORDER BY id DESC LIMIT 1`, (err, row) => {
//   if (err) {
//     console.error(err.message);
//   }
//   if (row) {
//     pageCount = row.page_count;
//   } else {
//     // If no rows exist, initialize with 0
//     db.run(`INSERT INTO count (page_count) VALUES (0)`);
//   }
// });

// app.get("/", (req, res) => {
//   // Increment the page count
//   pageCount++;

//   // Update the page count in the database
//   db.run(`UPDATE count SET page_count = ? WHERE id = (SELECT id FROM count ORDER BY id DESC LIMIT 1)`, [pageCount], function (err) {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log(`Page count updated to ${pageCount}`);

//     // Emit the updated count to all connected clients
//     io.emit("updateCount", pageCount);
//   });

//   res.render("index");
// });

// app.get("/count", (req, res) => {
//   // Render the count page and establish a WebSocket connection
//   res.render("count", { pageCount });
// });

// app.get("/about", (req, res) => {
//   res.render("about");
// });

// // Start the server
// server.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });

const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const http = require("http");
const { Server } = require("socket.io");

const port = 3000;

// Create HTTP server and integrate with Socket.IO
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

// MongoDB connection URI
const uri = "mongodb+srv://SAC:ZRb7i1FdJ7eC3SUp@cluster0.btu1pyt.mongodb.net/dell-forum";

// Initialize MongoDB client
let db;
let pageCount = 0;

MongoClient.connect(uri)
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db("dell-forum");

    // Initialize pageCount from the database
    db.collection("count").findOne({}, { sort: { _id: -1 } }).then((doc) => {
      if (doc) {
        pageCount = doc.page_count;
      } else {
        // If no documents exist, initialize with 0
        db.collection("count").insertOne({ page_count: 0 });
      }
    });
  })
  .catch((err) => console.error(err.message));

app.get("/", (req, res) => {
  // Increment the page count
  pageCount++;

  // Update the page count in the database
  db.collection("count").updateOne(
    {},
    { $set: { page_count: pageCount } },
    { upsert: true }
  ).then(() => {
    console.log(`Page count updated to ${pageCount}`);

    // Emit the updated count to all connected clients
    io.emit("updateCount", pageCount);
  }).catch((err) => console.error(err.message));

  res.render("index");
});

app.get("/count", (req, res) => {
  // Render the count page and establish a WebSocket connection
  res.render("count", { pageCount });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// Start the server
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
