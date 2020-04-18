let TrainStimuli = {
  'map_category': {"independent": {}, "uncertain": {}, "a_implies_c": {},
                   "a_iff_c": {}},
  'list_all': []
};

// INDPENDENT TRIALS
trials_independent = function(){
  let data = {}
  let bases = _.times(3, baseRampTrain);
  let x_max_base = bases[0].bounds.max.x;
  let y_min_base = bases[0].bounds.min.y;

  // plane uncertain falls
  let bA = block(x_max_base - lengthOnBase("uncertain", true) - 25 + props.blocks.h/2,
    y_min_base, cols.train_blocks[0],'blockLowA', horiz=true);
  // steep falls
  //x=350
  let bB = block(x=430, y_min_base = 225-props.walls.h/2, cols.train_blocks[1],
    'blockLowB', horiz=true);
  // plane uncertain doesnt fall
  let bC = block(x_max_base-lengthOnBase("low", true) + 30 + props.blocks.h/2,
    y_min_base, cols.train_blocks[1], 'blockLowC', horiz=true);

  let meta = {
    "blockLowA": ["uncertain", "high","train-independent-plane-falls"],
    "blockLowB": ["high", "low", "train-independent-steep-falls"],
    "blockLowC": ["uncertain", "high", "train-independent-plane-doesnt-fall"]
  };

  // 2.trial: steep and plane tilted walls are different
  [bA, bB, bC].forEach(function(block1, i){
    let id = "independent_" + i;
    let ramp_type = block1.label === "blockLowB" ? "independent_steep" : "independent_plane";
    let walls = Walls.train.independent.concat(Walls.train.tilted[ramp_type]);
    walls.unshift(bases[i]);
    if(block1.label === "blockLowC") {
      Matter.Body.scale(walls[0], 1.18, 1);
      Matter.Body.setPosition(walls[0], {x: walls[0].position.x + 28,
        y: walls[0].position.y})
    }
    let i_dist_col = block1.render.fillStyle === cols.train_blocks[0] ? 1 : 0;
    let distractor = blockOnBase(W4, PRIOR[meta[block1.label][1]],
      cols.train_blocks[i_dist_col], 'distractorBlock');
    let objs = {'objs': walls.concat([block1, distractor]),
                'meta': meta[block1.label], id: id}
    data[id] = objs
  });
  return data
}

// TRAIN UNCERTAINTY BLOCKS TO FALL
blockTrainUnc = function(offset, side, color, horiz=false) {
  let x = side === "left" ? W8.bounds.min.x : W8.bounds.max.x
  return block(x + offset, W8.bounds.min.y, color, 'block_'+side, horiz);
}

trials_uncertain = function(){
  let data = {}
  let meta = [
    ["falls-horiz", "doesnt-fall", "train-uncertain"],
    ["doesnt-fall-horiz","falls", "train-uncertain"]
  ];
  let bA = blockTrainUnc(0.5, "left", cols.train_blocks[0], horiz=true); // falls
  let bB = blockTrainUnc(-2.5, "right", cols.train_blocks[1]); // doesn't fall
  let bC = blockTrainUnc(-1, "right", cols.train_blocks[1]); // falls
  let bD = blockTrainUnc(2.5, "left", cols.train_blocks[0], horiz=true); // doesn't fall
  // let bA = blockOnBase(W8, -0.5, cols.train_blocks[0], "blockA_left", horiz=true); // falls
  // let bB = blockOnBase(W8, 0.5625, cols.train_blocks[1], "blockB_right", horiz=false); //doesnt fall
  // let bC = blockOnBase(W8, 0.5, cols.train_blocks[1], "blockC_right", horiz=false); // falls
  // let bD = blockOnBase(W8, -0.5625, cols.train_blocks[0], "blockD_left", horiz=true); // doesnt fall

  [[bA, bB], [bC, bD]].forEach(function(blocks, i){
    let id = "uncertain_" + i
    data[id] = {objs: Walls.train.uncertain.concat(blocks),
      meta: meta[i], id}
    });
  return data
}

// A implies C TRIALS
trials_ac = function(){
  let data = {};
  let meta = {
    'ac1': ["high", "low", 'train-a-implies-c-c-falls'],
    'ac2': ["uncertain", "uncertain", 'train-a-implies-c-c-falls'],
    'ac3': ["uncertain", "uncertain", "train-a-implies-c-c-doesnt-fall"]};
  let colors = {'ac1': [cols.train_blocks[0], cols.train_blocks[1]],
                'ac2': [cols.train_blocks[1], cols.train_blocks[0]],
                'ac3': [cols.train_blocks[0], cols.train_blocks[1]]};
  let horiz = {'ac1': [true, false], 'ac2': [false, true], 'ac3': [false, true]}

  let blocks = {};
  _.keys(colors).forEach(function(key, i){
    let b1 = blockOnBase(Walls.train.a_implies_c[0], -PRIOR[meta[key][0]],
      colors[key][0], 'blockUp', true);
    let b2 = blockOnBase(Walls.train.a_implies_c[1], PRIOR[meta[key][1]],
      colors[key][1], 'blockLow', false);

    if(key === "ac3" || key === "ac2") {
      Body.setPosition(b1, {x: b1.position.x-1, y: b1.position.y});
      key === "ac3" ? Body.setPosition(b2, {x: b2.position.x-2, y: b2.position.y})
                    : null;
    }
    let id = "a_implies_c_" + i
    data[id] = {objs: Walls.train.a_implies_c.concat([b1, b2]),
                meta: meta[key], id}
    });
    return data
}

// Seesaw TRIALS
trials_iff = function(){
  data = {};
  let w = Walls.train.a_iff_c[0]
  let bA = block(w.bounds.max.x, w.bounds.min.y, cols.train_blocks[1],
    'blockA', horiz=false);
  let bB = block(W7.bounds.min.x + 3, W7.bounds.min.y, cols.train_blocks[0],
    'blockB', horiz=false);

  [[bA, bB]].forEach(function(blocks, i){
    let id = "a_iff_c_" + i
    data[id] = {objs: Walls.train.a_iff_c.concat(blocks),
                meta: ["uncertain", "low", "train-iff"], id}
  });
  return data
}

if (MODE === "train" || MODE === "experiment") {
  TrainStimuli.map_category["a_iff_c"] = trials_iff();
  TrainStimuli.map_category["uncertain"] = trials_uncertain();
  TrainStimuli.map_category["independent"] = trials_independent();
  TrainStimuli.map_category["a_implies_c"] = trials_ac();
  // put all train stimuli into array independent of kind
  let train_keys = _.keys(TrainStimuli.map_category);
  train_keys.forEach(function(kind){
    let arr = _.values(TrainStimuli.map_category[kind]);
    TrainStimuli.list_all = TrainStimuli.list_all.concat(arr);
  });
}

getTrainStimulus = function(kind, nb) {
  let stimulus = TrainStimuli.map_category[kind][kind + "_" + nb];
  return stimulus
};
