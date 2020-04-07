let Train_stimuli = {"independent": {}, "uncertain": {}, "a_implies_c": {},
  "a_iff_c": {}};
// INDPENDENT TRIALS
let blockA = rect(Object.assign(props.blocks,
  {x:350, y: 275 - props.walls.h/2 - props.blocks.h/2}),
  {render: {fillStyle: cols.pinkish}}
);
let blockB = rect(Object.assign({w: props.blocks.w, h: props.blocks.h},
  {x:450, y: 275 - props.walls.h/2 - props.blocks.h/2}),
  {render: {fillStyle: cols.pinkish}, label: "blockB"}
);

let blockC = rect(Object.assign(props.blocks,
  {x:450, y: Walls.train.independent_plane[1].bounds.min.y - props.blocks.h/2}),
  {render: {fillStyle: cols.pinkish}, label: "blockB"}
);

let meta = [["low", "-", "train-independent-steep-doesnt-fall"],
  ["low","-", "independent-steep-falls"], ["low", "-","train-independent-plane-doesnt-fall"]];
let count = 0;
[blockA, blockB].forEach(function(block, i){
  let id = "independent_" + i;
  let w = Walls.train.independent.concat(Walls.train.independent_steep);
  let objs = {objs: w.concat([block]), meta: meta[i], id: id}
  Train_stimuli["independent"][id] = objs
});
let w = Walls.train.independent.concat(Walls.train.independent_plane);
Train_stimuli["independent"]["independent_2"] = {
  objs: w.concat([blockC]), meta: meta[2], id: "independent_2"
};

// TRAIN UNCERTAINTY BLOCKS TO FALL
blockTrainUnc = function(offset, side, color, horiz=false) {
  let x = side === "left" ? W8.bounds.min.x : W8.bounds.max.x
  let size = horiz ? {w: props.blocks.h, h: props.blocks.w} :
    {w: props.blocks.w, h: props.blocks.h};
  let block = rect(Object.assign(size,
    {x: x, y: W8.position.y - props.walls.h/2 - size.h/2}),
    {render: {fillStyle: color}}
  );
  Body.setPosition(block, {x: block.position.x + offset, y: block.position.y})
  return(block);
}

meta = [["falls-horiz", "doesnt-fall", 'train-uncertain'],
  ["doesnt-fall-horiz","falls", 'train-uncertain']];
blockA = blockTrainUnc(0.5, "left", cols.red, horiz=true); // falls
blockB = blockTrainUnc(-2.5, "right", cols.orange); // doesn't fall
let blockD = blockTrainUnc(2.5, "left", cols.red, horiz=true); // doesn't fall
blockC = blockTrainUnc(-1, "right", cols.orange); // falls

[[blockA, blockB], [blockC, blockD]].forEach(function(blocks, i){
  let id = "uncertain_" + i
  Train_stimuli["uncertain"][id] = {objs: Walls.train.uncertain.concat(blocks),
    meta: meta[i], id}
});

// A implies C TRIALS
let p_fall = [["high", "low", 'train-a-implies-c-c-falls'],
  ["uncertain", "uncertain", 'train-a-implies-c-c-falls'],
  ["uncertain", "uncertain", "train-a-implies-c-c-doesnt-fall"]];
blockA = block(Walls.train.a_implies_c[0], -prior[p_fall[0][0]], cols.red, 'blockA',
  undefined, undefined,horiz=true); //upper wall
blockB = block(Walls.train.a_implies_c[1], prior[p_fall[0][1]], cols.orange, 'blockB');//lower wall

blockC = block(Walls.train.a_implies_c[0], -prior[p_fall[1][0]], cols.orange, 'blockC'); //upper wall
Body.setPosition(blockC, {x: blockC.position.x-1, y: blockC.position.y});
blockD = block(Walls.train.a_implies_c[1], prior[p_fall[1][1]], cols.red,
  'blockD', undefined, undefined, horiz=true); //lower wall

blockE = block(Walls.train.a_implies_c[1], prior[p_fall[1][1]], cols.darkgrey, 'blockE',
  undefined, undefined, horiz=true); //lower wall
Body.setPosition(blockE, {x: blockE.position.x-2, y: blockE.position.y});

[[blockA, blockB], [blockC, blockD], [blockC, blockE]].forEach(function(blocks, i){
  let id = "a_implies_c_" + i
  Train_stimuli["a_implies_c"][id] = {objs: Walls.train.a_implies_c.concat(blocks),
    meta: p_fall[i], id}
});

// Seesaw TRIALS
w = Walls.train.a_iff_c[0]
blockA = rect(Object.assign(props.blocks,
  {x: w.bounds.max.x, y: w.bounds.min.y - props.blocks.h/2,
   render: {fillStyle: cols.pinkish}})
 );
blockB = rect(Object.assign(props.blocks,
   {x: W7.bounds.min.x + 3, y: W7.bounds.min.y - props.blocks.h/2,
    render: {fillStyle: cols.olive}}
 ));
[[blockA, blockB]].forEach(function(blocks, i){
  let id = "a_iff_c_" + i
  Train_stimuli["a_iff_c"][id] = {objs: Walls.train.a_iff_c.concat(blocks),
    meta: ["uncertain", "low", "train-iff"], id}
});

let TrainStimuli = [];
let train_keys = _.keys(Train_stimuli);
train_keys.forEach(function(kind){
  TrainStimuli = TrainStimuli.concat(_.values(Train_stimuli[kind]));
});

getTrainStimulus = function(kind, nb) {
  let stimulus = Train_stimuli[kind][kind + "_" + nb];
  return stimulus
};
