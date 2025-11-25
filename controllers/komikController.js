// controllers/komikController.js

const db = require('../models');
const komikService = require('../services/komikService');

async function createKomik(req, res) {
    try {
        const komikData = req.body;

        if (req.file) {
            komikData.imageType = req.file.mimetype;
            komikData.imageName = req.file.originalname;
            komikData.imageData = req.file.buffer;
        }

        const result = await komikService.createKomik(db, komikData);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

async function getAllKomik(req, res) {
    try {
        const result = await komikService.getAllKomik(db);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getKomikById(req, res) {
    try {
        const { id } = req.params;
        const result = await komikService.getKomikById(db, id);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
}

async function updateKomik(database, id, komikData) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    }

    await komik.update(komikData);
    return komik;
}

async function deleteKomik(database, id) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    }

    await komik.destroy();
    return { message: `Komik dengan ID ${id} berhasil dihapus` };
}

module.exports = {
    createKomik,
    getAllKomik,
    getKomikById,
    updateKomik,
    deleteKomik,
};
