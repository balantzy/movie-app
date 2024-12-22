const ReviewsDAO = require("./dao/reviewsDAO");

const apiPostReview = async (req, res, next) => {
    try {
        const movieId = req.body.movieId
        const review = req.body.review
        const user = req.body.user

        const reviewResponse = await ReviewsDAO.create(req.body)
        res.status(200).json({ reviewResponse })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const apiGetReviews = async (req, res, next) => {
    try {
    let id = req.params.id || {}
    let reviews = await ReviewsDAO.find({ movieId: id })
    if (!reviews) {
        res.status(404).json({ error: "Not found" })
        return
    }
    res.json(reviews)
}
    catch (error){
        console.log(`api, ${error}`)
        res.status(500).json({ error: error })
}
}

const apiGetReview = async (req, res, next) => {
    try {
        let id = req.params.id || {}
        let review = await ReviewsDAO.findOne({ _id: id })
        if (!review) {
            res.status(404).json({ error: "Not found" })
            return
        }
        res.json(review)
    } catch (error) {
        console.log(`api, ${error}`)
        res.status(500).json({ error: error })
    }
}

const apiUpdateReview = async (req, res, next) => {
    try {
        const {
            body: { review, user },
            params: { id: reviewId }
        } = req   

        if (review === '' || user === ''){
            throw new Error('Review and user fields cannot be empty.')
        }

        const reviewResponse =  await ReviewsDAO.findByIdAndUpdate(
            { _id: reviewId }, req.body, { new: true, runValidators: true }
        )
        if (!reviewResponse){
            throw new Error(`No review with ${reviewId} exists`)
        }
        res.status(200).json({ reviewResponse })

}
    catch (error){
        res.status(500).json({ error: error.message })
}
}

const apiDeleteReview = async (req, res, next) => {
        try {
            const {
                params: { id: reviewId }
            } = req  

            const reviewResponse = await ReviewsDAO.findByIdAndDelete({ _id: reviewId })
            if (!reviewResponse){
                throw new Error(`No review with id: ${reviewId} exists.`)
            }
        res.status(200).json({ status: "success" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { apiPostReview, apiGetReview, apiDeleteReview, apiUpdateReview, apiGetReviews  }