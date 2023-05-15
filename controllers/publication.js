const Publication = require('../models/Publication');

exports.createPublication = (req, res, next) => {
    const publication = new Publication({
      userId: req.body.userId,
      date: Date.now(),
      commentaire: req.body.commentaire
    });
    publication.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.modifyPublication = (req, res, next) => {
    const publication = new Publication({
      _id: req.params.id,
      userId: req.body.userId,
      date: req.body.date,
      commentaire: req.body.commentaire
    });
    Publication.updateOne({_id: req.params.id}, publication).then(
      () => {
        res.status(201).json({
          message: 'Publication updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};


exports.deletePublication = (req, res, next) => {
    Publication.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.getAllPublication = (req, res, next) => {
    Publication.find().then(
      (publication) => {
        res.status(200).json(publication);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};


