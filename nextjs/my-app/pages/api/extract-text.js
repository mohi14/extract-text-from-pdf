import pdfParse from 'pdf-parse';

export default async (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        res.status(400).end();
        return;
    }

    try {
        const result = await pdfParse(req.files.pdfFile.data);
        res.status(200).json({ text: result.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};
