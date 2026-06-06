import "dotenv/config";
import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const app = express();
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});


app.get("/", async (req, res) => {
    const data = await prisma.user.findMany();
    res.json({
        data
    })
});

app.post("/", async (req, res) => {
    await prisma.user.create({
        data: {
        username: Math.random().toString(),
        password: Math.random().toString()
        }
    })
    res.json({
        message: "post endpoint"
    })
});

app.listen(3000);