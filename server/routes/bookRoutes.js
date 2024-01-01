const router = require(`express`).Router();
const Book = require(`../model/bookModels`);

// Create book
router.post(`/add`, async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(200).json({
    success: true,
    message: `Book crested Successfully`,
    book,
  });
});

// get all books

router.get(`/books`, async (req, res, next) => {
  try {
    const books = await Book.find();

    if (books.length <= 0) {
      return res
        .status(400)
        .json({ success: false, message: `No books found` });
    } else {
      return res.status(200).json({ success: true, books });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// get single book
router.get(`/books/:id`, async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    if (book) {
      return res.status(200).json({ success: true, book });
    } else {
      return res
        .status(404)
        .json({ success: false, message: `Book with the id not found` });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// update a book
router.patch(`/update/:id`, async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const updateInfo = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updateInfo, {
      new: true,
    });
    if (book) {
      return res
        .status(200)
        .json({ success: true, message: `Book Successfully updated` });
    } else {
      return res
        .status(404)
        .json({ success: false, message: `Book with id not found` });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// delete book
router.delete(`/delete/:id`, async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await Book.deleteOne({ _id: bookId });
    if (book.deletedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: `Book deleted successfully` });
    } else {
      return res
        .status(404)
        .json({ success: false, message: `Book id not found` });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
