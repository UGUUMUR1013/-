const express = require("express");
const app = express();
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());


//memo get info
app.get("/", async (req, res) =>{
    const allText = await prisma.memo.findMany();
    res.json(allText);

});

//memo create info
app.post("/", async (req, res) =>{
    const newMemo = await prisma.memo.create({
        data : req.body
    });
    res.json(newMemo);
})

app.put("/:id", async (req, res) => {
    const id = req.params.id;
    const textChange = req.body.text;
    const updatedMemo = await prisma.memo.update({
        where:{
            id : parseInt(id)
        },
        data : {
            text: textChange
        },
    });
    res.json(updatedMemo);
})

app.delete("/:id", async (req, res) =>{
    const id = req.params.id;
    const deleteMemo = await prisma.memo.delete({
        where:{
            id: parseInt(id)
        },
    });
    res.json(deleteMemo);
})




app.listen(3001, () => console.log("Server running on port ${3001}"));
