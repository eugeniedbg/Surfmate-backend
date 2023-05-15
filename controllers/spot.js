const Spot = require('../models/Spot');
const AvisSpot = require('../models/AvisSpot');

exports.createSpot = (req, res, next) => {
    const spot = new Spot({
        nom: req.body.nom,
        ville: req.body.ville,
        pays: req.body.pays,
        GPS: req.body.GPS ? req.body.GPS : null,
    });
    spot.save().then(
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

/*
exports.modifySpot = (req, res, next) => {
    const spot = new Spot({
        _id: req.params.id,
        //id: req.body.id,
        nom: req.body.nom,
        ville: req.body.ville,
        pays: req.body.pays,
        //GPS: req.body.GPS ? req.body.GPS : null,
        note: req.body.note
    });
    Spot.updateOne({_id: req.params.id}, spot).then(
        () => {
          res.status(201).json({
            message: 'Spot updated successfully!'
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
*/

exports.modifySpot = (req, res, next) => {
  const spot = new Spot({
    _id: req.params.id,
    nom: req.body.nom,
    ville: req.body.ville,
    pays: req.body.pays,
    note: req.body.note
  });

  // Récupérer tous les avis pour ce spot
  AvisSpot.aggregate([
    { $match: { spotId: req.params.id } },
    { $group: { _id: null, moyenne: { $avg: "$note" } } }
  ]).then((result) => {
    // Le reste du code ici
  }).catch((err) => {
    res.status(500).json({ error: err });

    // Mettre à jour la note du spot avec la moyenne des avis
    spot.note = result.length ? result[0].moyenne : null;

    // Enregistrer le spot mis à jour
    Spot.updateOne({ _id: req.params.id }, spot).then(
      () => {
        res.status(201).json({
          message: 'Spot updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
};

exports.deleteSpot = (req, res, next) => {
    Spot.deleteOne({_id: req.params.id}).then(
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

exports.getOneSpot = (req, res, next) => {
    Spot.findOne({
        _id: req.params.id
      }).then(
        (spot) => {
          res.status(200).json(spot);
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
};

exports.getAllSpot = (req, res, next) => {
  Spot.find()
    .populate('avis') // inclure tous les avis
    .select('nom ville pays GPS noteMoyenne') // inclure uniquement le nom, la ville, le pays, les coordonnées GPS et la note moyenne
    .then((spots) => {
      res.status(200).json(spots);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
  

exports.getSpotByVille = (req, res, next) => {
    Spot.findOne({
        ville: req.params.ville
    })
    .then((spot) => {
        res.status(200).json(spot);
    }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getSpotByPays = (req, res, next) => {
    Spot.findOne({
        pays: req.params.pays
    })
    .then((spot) => {  
        res.status(200).json(spot);
    }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getSpotByNom = (req, res, next) => {
    Spot.findOne({
        nom: req.params.nom
    })
    .then((spot) => {
        res.status(200).json(spot);
    }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getSpotByNote = (req, res, next) => {
    Spot.findOne({
        note: req.params.note
    })
    .then((spot) => {
        res.status(200).json(spot);
    }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getAllAvisSpotBySpotId = (req, res, next) => {
  AvisSpot.find({ spotId: req.params.id }).then(
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
};
