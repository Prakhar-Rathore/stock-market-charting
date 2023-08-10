const express = require("express");
const { db } = require("../../config/firebasev8");
const { spawn, spawnSync, exec } = require("child_process");
const sectorRouter = express.Router();

sectorRouter.get("/", async (req, res) => {
    const python = spawn('python3', ['./Routes/sector/scrapper.py']);

    python.on('close', (code) => {
        console.log(`Scrapper child process exited with code ${code}`);
    }
    );
    res.status(200).json({ success: true});
});

module.exports = sectorRouter;
