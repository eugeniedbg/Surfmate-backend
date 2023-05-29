const AvisSpot = require('../models/AvisSpot');
const { modifySpot } = require('./spot');
const Spot = require('../models/Spot');

exports.createAvisSpot = (req, res, next) => {
  const avisSpot = new AvisSpot({
    spotId: req.body.spotId,
    userId: req.body.userId,
    date: Date.now(),
    noteLieu: req.body.noteLieu,
    commentaire: req.body.commentaire
  });
  avisSpot.save().then(() => {
    // Récupère l'id du spot associé à l'avis
    const spotId = avisSpot.spotId;

    // Ajoute l'avis au tableau avis du modèle Spot
    Spot.findByIdAndUpdate(spotId, { $push: { avis: avisSpot._id } }).then(() => {
      // Calcule la moyenne des notes pour ce spot
      AvisSpot.aggregate([
        { $match: { spotId: spotId } },
        { $group: { _id: null, moyenne: { $avg: "$noteLieu" } } }
      ]).then((result) => {
        // Met à jour le spot avec la moyenne calculée
        Spot.findByIdAndUpdate(spotId, { noteMoyenne: result.length ? result[0].moyenne : null }).then(() => {
          res.status(201).json({
            message: 'Avis created successfully!'
          });
        }).catch((error) => {
          res.status(400).json({
            error: error
          });
        });
      });
    }).catch((error) => {
      res.status(400).json({
        error: error
      });
    });
  }).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
};



exports.modifyAvisSpot = (req, res, next) => {
    const avisSpot = new AvisSpot({
      _id: req.params.id,
      spotId: req.body.spotId,
      userId: req.body.userId,
      date: req.body.date,
      noteLieu: req.body.noteLieu,
      commentaire: req.body.commentaire
    });
    AvisSpot.updateOne({_id: req.params.id}, avisSpot).then(
      () => {
        res.status(201).json({
          message: 'AvisSpot updated successfully!'
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

exports.deleteAvisSpot = (req, res, next) => {
    AvisSpot.deleteOne({_id: req.params.id}).then(
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



exports.getAllAvisSpot = (req, res, next) => {
  console.log(req.params.spot_id);
  if (req.query.spot_id) {
    AvisSpot.find({ spotId: req.query.spot_id }).then(
    (avisSpot) => {
      res.status(200).json(avisSpot);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
} else {
    AvisSpot.find().then(
      (avisSpot) => {
        res.status(200).json(avisSpot);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}
};