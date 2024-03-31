module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        tournament_name: {type: String},
        creator_name: {type: String},
        winner_name:{type: String},        
        rooms:[{
            room_id:{type: String},
            players:[{
                player_name: {type: String },
                score: { type: Number, default:  0}
            }]
        }]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Tournament = mongoose.model("tournament", schema);
    return Tournament;
  };
  