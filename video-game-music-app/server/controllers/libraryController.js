const db = require('../db');

// This should add our soundtracks to our users library
exports.addToLibrary = (req, res) => {
  const q = "INSERT INTO library (`user_id`, `game_id`, `gamename`) VALUES(?, ?, ?)";
  const { user_id, game_id, gamename } = req.body;
  db.query(q, [user_id, game_id, gamename], (error) => {
    if (error) {
      console.error('Backend error: ', error);
      return res.status(500).json({ message: 'Could not add game to library' });
    }
    return res.status(200).json({ message: "Game has been successfully added!" });
  });
};


// This will delete a soundtrack from the users library
exports.deleteFromLibrary = (req, res) => {
  const q = "DELETE FROM library WHERE user_id = ? AND game_id = ?";
  const { user_id, game_id } = req.body;
  db.query(q, [user_id, game_id], (error) => {
    if (error) {
      console.error('Could not delete', error);
      return res.status(500).json({ message: "Game not removed." });
    }
    return res.status(200).json({ message: "Game has been successfully removed!" });
  });
};

// This will get all our library games for the logged in user
exports.getLibrary = (req, res) => {
  const { user_id } = req.params;
  const q = "SELECT * FROM library WHERE user_id = ?";
  db.query(q, [user_id], (error, results) => {
    if (error) {
      console.error('Error while getting user library games: ', error);
      return res.status(500).json({ message: 'Could not fetch user library' });
    }
    return res.status(200).json(results);
  });
};