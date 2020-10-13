const { Router } = require("express");
const { withJWTAuthMiddleware } = require("express-kun");
const router = Router();
var multer = require('multer');
const Pet = require("./models/pet");
const User = require("./models/user");
const mongoose = require('mongoose');

const parser = multer({ dest: 'public/uploads/' });

const protectedRouter = withJWTAuthMiddleware(router, process.env.PRIVATE_KEY);

protectedRouter.get("/home", (req, res) => {
    res.json({ message: "Welcome to home." });
});

protectedRouter.post("/pet/:id/upload", async (req, res) => {
    parser.single('foto')(req, res, err => {
        if (err)
            res.status(500).json({});
        else {
            const image = {};
            image.id = req.file.filename;
            image.url = `/uploads/${image.id}`;
            Pet.findById(req.params.id, (err, pet) => {
                pet.fotos.push(image.id)
                pet.save();
                res.status(200).json({ message: "success" });
            });
        }
    });
})

protectedRouter.put("/users", async (req, res) => {
    req.body.primeiro_acesso = false;
    let user = await User.findByIdAndUpdate(res.locals.decoded.user._id, req.body, { new: true });
    return res.json(user);
});

protectedRouter.post("/pets/:id/match", async (req, res) => {
    let pet = await Pet.findById(req.params.id);
    const user = res.locals.decoded.user;
    Pet.findById(req.params.id, (err, pet) => {
        if (req.body.swipe == "left")
            pet.dislike.push(user);
        else
            pet.favorites.push(user);
        pet.save();
        res.status(200).json({ message: "success" });
    });
});

protectedRouter.delete("/pets/:id", async (req, res) => {
    Pet.findByIdAndDelete(req.params.id, function (err) {
        if (err) console.log(err);
        res.status(200).json({ message: "success" });
    });

});

protectedRouter.delete("/pets/:id/photo/:photo_id", async (req, res) => {
    Pet.findById(req.params.id, (err, pet) => {
        pet.fotos = pet.fotos.filter(foto => foto !== req.params.photo_id);
        pet.save();
        res.status(200).json({ message: "success" });
    });
});



protectedRouter.get("/pets/:id", async (req, res) => {
    let pet = await Pet.findById(req.params.id)
        .populate("doador");
    return res.json(pet);
});




protectedRouter.put("/pets/:id", async (req, res) => {
    let pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(pet);
});

protectedRouter.get("/favorites", async (req, res) => {
    const user = res.locals.decoded.user;
    const pets = await Pet.find({ favorites: { $eq: user._id } });
    return res.json(pets);
});

protectedRouter.get("/pets", async (req, res) => {
    const facebook_id = res.locals.decoded.user.facebook_id;
    let user = await User.findOne({ facebook_id }).populate("pets");
    return res.json(user.pets);
});

protectedRouter.get("/search", async (req, res) => {
    const user = res.locals.decoded.user;

    let query = { favorites: { $ne: mongoose.Types.ObjectId(user._id) }, dislike: { $ne: mongoose.Types.ObjectId(user._id) } };
    if (req.query.castracao !== "")
        query.castracao = (req.query.castracao === "true");
    if (req.query.tipo !== "")
        query.tipo = req.query.tipo;
    if (req.query.genero !== "")
        query.genero = req.query.genero;
    if (req.query.tamanho !== "")
        query.tamanho = req.query.tamanho;

    query.ano = { $lte: (parseInt(req.query.idade[1]) === 5 ? 20 : parseInt(req.query.idade[1])), $gte: parseInt(req.query.idade[0]) };
    query.mes = { $lte: (parseInt(req.query.idade[1]) === 0.5 ? 5 : 11), $gte: 0 };

    let pos = JSON.parse(req.query.localizacao);
    let pets = await Pet.aggregate([
        {
            $geoNear: {
                "query": query,
                "near": {
                    "type": "Point",
                    "coordinates": [pos.longitude, pos.latitude]
                },
                "maxDistance": parseInt(req.query.distancia) * 1000,
                "spherical": true,
                "distanceField": "distancia",
                "distanceMultiplier": 0.001,

            }
        }
    ]);

    res.status(200).json(pets);
})


protectedRouter.post("/pets", async (req, res) => {

    const user = res.locals.decoded.user;

    let pet = await Pet.create(req.body);
    pet.doador = user._id;
    await pet.save()
        .then(_ => {
            User.findOne({ 'facebook_id': user.facebook_id }, (err, user) => {
                user.pets.push(pet);
                user.save();
            });
        })

    res.json(pet);
})

module.exports = router;