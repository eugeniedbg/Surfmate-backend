const Creneau = require('../models/Creneau');


exports.createCreneau = (req, res, next) => {
    const creneau = new Creneau({
      spotId: req.body.spotId,
      userId: req.body.userId,
      date: req.body.date
    });
    creneau.save().then(
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

exports.modifyCreneau = (req, res, next) => {
    const creneau = new Creneau({
      _id: req.params.id,
      spotId: req.body.spotId,
      userId: req.body.userId,
      date: req.body.date
    });
    Creneau.updateOne({_id: req.params.id}, creneau).then(
      () => {
        res.status(201).json({
          message: 'Creneau updated successfully!'
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

exports.deleteCreneau = (req, res, next) => {  
    Creneau.deleteOne({_id: req.params.id}).then(
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

exports.getAllCreneau = (req, res, next) => {
    Creneau.find().then(
      (creneaux) => {
        res.status(200).json(creneaux);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.getOneCreneau = (req, res, next) => {
    Creneau.findOne({
      _id: req.params.id
    }).then(
      (creneau) => {
        res.status(200).json(creneau);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

exports.getCreneauBySpot = (req, res, next) => {
    Creneau.find({
      spotId: req.params.id
    }).then(
      (creneau) => {
        res.status(200).json(creneau);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

/*exports.getCreneauByUser = (req, res, next) => {

};*/

exports.getCreneauByDate = (req, res, next) => {
    Creneau.find({
      date: req.params.date
    }).then(
      (creneau) => {
        res.status(200).json(creneau);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

exports.getCreneauBySpotAndDate = (req, res, next) => {
    Creneau.find({
      spotId: req.params.id,
      date: req.params.date
    }).then(
      (creneau) => {
        res.status(200).json(creneau);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

