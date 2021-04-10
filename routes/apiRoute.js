const notes = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


module.exports = function(app) {

    app.get("/api/notes", (req, res) => {
        res.json(notes);
    })
    app.post("/api/notes", (req, res) => {
        const note = {...req.body, id: uuidv4()};
        const file = path.join(__dirname, "../db/db.json");

        note.id = uuidv4();
        notes.push(note);

        fs.writeFile(file, JSON.stringify(notes, null, 4), err => {
            if (err) throw err;
        });

        res.send(note);
    });
    app.delete("/api/notes/:id", (req, res) => {
        const noteId = req.params.id;
        const file = path.join(__dirname, "../db/db.json");

        for(const note of notes){
            if(noteId === note.id) {
                const index = notes.indexOf(note);
                notes.splice(index, 1);
                fs.writeFile(file, JSON.stringify(notes, null, 4), err => {
                    if (err) throw err;
                });
                res.end();
            }
        }
    });
}