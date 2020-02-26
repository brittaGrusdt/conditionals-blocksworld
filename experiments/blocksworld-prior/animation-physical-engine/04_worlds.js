// 1. get data
let dataAll = [
  {"platform2.height": "high", "platform1.width": "narrow", "pa_given_c": "uncertain", "platform2.width": "narrow", "C.orientation": "vertical", "AC.position": "-1", "comment1": "\nNeeds training example", "comment2": "both become less likely given the other", "platform.type": "basic2", "pc": "high", "pa": "high", "A.orientation": "vertical", "platform.dist": "short", "platform1.height": "high", "pc_given_a": "uncertain", "dependence.a": "1", "id": "S1-121", "dependence.c": "1"},
  {"platform2.height": "default", "platform1.width": "narrow", "pa_given_c": "uncertain", "platform2.width": "narrow", "C.orientation": "vertical", "AC.position": "-1", "comment1": "p(A|C) uncertain because of space", "comment2": "-1", "platform.type": "basic2", "pc": "low", "pa": "high", "A.orientation": "vertical", "platform.dist": "short", "platform1.height": "high", "pc_given_a": "low", "dependence.a": "1", "id": "S10-203", "dependence.c": "0"},
  {"platform2.height": "-1", "platform1.width": "default", "pa_given_c": "high", "platform2.width": "-1", "C.orientation": "vertical", "AC.position": "side", "comment1": "-1", "comment2": "-1", "platform.type": "basic1", "pc": "low", "pa": "high", "A.orientation": "vertical", "platform.dist": "-1", "platform1.height": "default", "pc_given_a": "low", "dependence.a": "0", "id": "S12-203", "dependence.c": "0"},
  {"platform2.height": "high", "platform1.width": "narrow", "pa_given_c": "uncertain", "platform2.width": "narrow", "C.orientation": "vertical", "AC.position": "-1", "comment1": "p(A|C) uncertain because of space,\nP(C|A) low because A would fall more to the right", "comment2": "both become less likely given the other", "platform.type": "basic2", "pc": "uncertain", "pa": "high", "A.orientation": "vertical", "platform.dist": "short", "platform1.height": "high", "pc_given_a": "low", "dependence.a": "1", "id": "S15-443", "dependence.c": "1"},
  {"platform2.height": "default", "platform1.width": "narrow", "pa_given_c": "uncertain", "platform2.width": "narrow", "C.orientation": "vertical", "AC.position": "-1", "comment1": "similar to S10-203", "comment2": "-1", "platform.type": "basic2", "pc": "uncertain", "pa": "high", "A.orientation": "vertical", "platform.dist": "short", "platform1.height": "high", "pc_given_a": "uncertain", "dependence.a": "1", "id": "S20-468", "dependence.c": "0"},
  {"platform2.height": "-1", "platform1.width": "default", "pa_given_c": "high", "platform2.width": "-1", "C.orientation": "vertical", "AC.position": "side", "comment1": "-1", "comment2": "-1", "platform.type": "basic1", "pc": "uncertain", "pa": "high", "A.orientation": "vertical", "platform.dist": "-1", "platform1.height": "default", "pc_given_a": "uncertain", "dependence.a": "0", "id": "S22-468", "dependence.c": "0"},
  {"platform2.height": "-1", "platform1.width": "default", "pa_given_c": "low", "platform2.width": "-1", "C.orientation": "vertical", "AC.position": "side", "comment1": "-1", "comment2": "-1", "platform.type": "basic1", "pc": "low", "pa": "low", "A.orientation": "vertical", "platform.dist": "-1", "platform1.height": "default", "pc_given_a": "low", "dependence.a": "0", "id": "S30-805", "dependence.c": "0"},
  {"platform2.height": "default", "platform1.width": "narrow", "pa_given_c": "uncertain", "platform2.width": "narrow", "C.orientation": "vertical", "AC.position": "-1", "comment1": "needs air draft", "comment2": "similar to S20-468", "platform.type": "basic2", "pc": "low", "pa": "low", "A.orientation": "vertical", "platform.dist": "short", "platform1.height": "high", "pc_given_a": "low", "dependence.a": "1", "id": "S32-806", "dependence.c": "0"},
  {"platform2.height": "high", "platform1.width": "narrow", "pa_given_c": "high", "platform2.width": "narrow", "C.orientation": "vertical", "AC.position": "-1", "comment1": "-1", "comment2": "-1", "platform.type": "basic2", "pc": "low", "pa": "low", "A.orientation": "horizontal", "platform.dist": "very_short", "platform1.height": "default", "pc_given_a": "low", "dependence.a": "2", "id": "S34-806", "dependence.c": "0"},
  {"platform2.height": "-1", "platform1.width": "-1", "pa_given_c": "uncertain", "platform2.width": "-1", "C.orientation": "horizontal", "AC.position": "stack_A_on_C", "comment1": "New\nNeeds training example", "comment2": "should be stacked perfectly in the middle; \nOr perfectly on each edge", "platform.type": "seesaw", "pc": "low", "pa": "low", "A.orientation": "horizontal", "platform.dist": "-1", "platform1.height": "-1", "pc_given_a": "uncertain", "dependence.a": "1", "id": "S42-806", "dependence.c": "1"},
  {"platform2.height": "-1", "platform1.width": "narrow", "pa_given_c": "high", "platform2.width": "-1", "C.orientation": "horizontal", "AC.position": "stack_A_on_C", "comment1": "needs training example", "comment2": "both become more likely given the other, one of them more so", "platform.type": "basic1", "pc": "low", "pa": "low", "A.orientation": "vertical", "platform.dist": "-1", "platform1.height": "default", "pc_given_a": "uncertain", "dependence.a": "2", "id": "S44-806", "dependence.c": "1"},
  {"platform2.height": "-1", "platform1.width": "narrow", "pa_given_c": "high", "platform2.width": "-1", "C.orientation": "horizontal", "AC.position": "stack_C_on_A", "comment1": "similar to S42-806 and S97-1674\nDifficult\nNeeds training", "comment2": "both become more likely given the other", "platform.type": "basic1", "pc": "low", "pa": "low", "A.orientation": "horizontal", "platform.dist": "-1", "platform1.height": "default", "pc_given_a": "high", "dependence.a": "2", "id": "S54-806", "dependence.c": "2"},
  {"platform2.height": "default", "platform1.width": "narrow", "pa_given_c": "low", "platform2.width": "narrow", "C.orientation": "horizontal", "AC.position": "-1", "comment1": "difficult", "comment2": "-1", "platform.type": "basic2", "pc": "uncertain", "pa": "low", "A.orientation": "vertical", "platform.dist": "short", "platform1.height": "default", "pc_given_a": "low", "dependence.a": "0", "id": "S55-1006", "dependence.c": "1"},
  {"platform2.height": "-1", "platform1.width": "default", "pa_given_c": "low", "platform2.width": "-1", "C.orientation": "vertical", "AC.position": "side", "comment1": "-1", "comment2": "-1", "platform.type": "basic1", "pc": "uncertain", "pa": "low", "A.orientation": "vertical", "platform.dist": "-1", "platform1.height": "default", "pc_given_a": "uncertain", "dependence.a": "0", "id": "S57-1007", "dependence.c": "0"},
  {"platform2.height": "-1", "platform1.width": "narrow", "pa_given_c": "low", "platform2.width": "-1", "C.orientation": "vertical", "AC.position": "stack_C_on_A", "comment1": "similar to S55-1006", "comment2": "-1", "platform.type": "basic1", "pc": "uncertain", "pa": "low", "A.orientation": "horizontal", "platform.dist": "-1", "platform1.height": "default", "pc_given_a": "high", "dependence.a": "0", "id": "S59-1007", "dependence.c": "1"},
  {"platform2.height": "default", "platform1.width": "very_narrow", "pa_given_c": "uncertain", "platform2.width": "very_narrow", "C.orientation": "vertical", "AC.position": "-1", "comment1": "New\nsimilar to S10-203", "comment2": "horizontal", "platform.type": "basic2", "pc": "uncertain", "pa": "low", "A.orientation": "vertical", "platform.dist": "extreme_short", "platform1.height": "default", "pc_given_a": "high", "dependence.a": "1", "id": "S63-1039", "dependence.c": "1"},
  {"platform2.height": "-1", "platform1.width": "default", "pa_given_c": "high", "platform2.width": "-1", "C.orientation": "vertical", "AC.position": "side", "comment1": "-1", "comment2": "-1", "platform.type": "basic1", "pc": "high", "pa": "high", "A.orientation": "vertical", "platform.dist": "-1", "platform1.height": "default", "pc_given_a": "high", "dependence.a": "0", "id": "S7-130", "dependence.c": "0"},
  {"platform2.height": "default", "platform1.width": "default", "pa_given_c": "low", "platform2.width": "default", "C.orientation": "vertical", "AC.position": "", "comment1": "similar to S55-1006", "comment2": "-1", "platform.type": "basic2", "pc": "low", "pa": "high", "A.orientation": "vertical", "platform.dist": "very_short", "platform1.height": "default", "pc_given_a": "low", "dependence.a": "2", "id": "S8-202", "dependence.c": "0"},
  {"platform2.height": "default", "platform1.width": "default", "pa_given_c": "low", "platform2.width": "default", "C.orientation": "vertical", "AC.position": "-1", "comment1": "-1", "comment2": "both become less likely given the other, \nSimilar to S15-443", "platform.type": "basic2", "pc": "uncertain", "pa": "uncertain", "A.orientation": "vertical", "platform.dist": "short", "platform1.height": "default", "pc_given_a": "low", "dependence.a": "1", "id": "S83-1609", "dependence.c": "1"},
  {"platform2.height": "-1", "platform1.width": "default", "pa_given_c": "uncertain", "platform2.width": "-1", "C.orientation": "vertical", "AC.position": "side", "comment1": "-1", "comment2": "-1", "platform.type": "basic1", "pc": "uncertain", "pa": "uncertain", "A.orientation": "vertical", "platform.dist": "-1", "platform1.height": "default", "pc_given_a": "uncertain", "dependence.a": "0", "id": "S89-1642", "dependence.c": "0"},
  {"platform2.height": "high", "platform1.width": "narrow", "pa_given_c": "high", "platform2.width": "narrow", "C.orientation": "vertical", "AC.position": "-1", "comment1": "similar to S59-1007\n", "comment2": "-1", "platform.type": "basic2", "pc": "uncertain", "pa": "uncertain", "A.orientation": "horizontal", "platform.dist": "extreme_short", "platform1.height": "default", "pc_given_a": "uncertain", "dependence.a": "1", "id": "S93-1674", "dependence.c": "0"},
  {"platform2.height": "-1", "platform1.width": "-1", "pa_given_c": "high", "platform2.width": "-1", "C.orientation": "horizontal", "AC.position": "side", "comment1": "-1", "comment2": "Both become more likely given the other;\nSimilar to S42-806", "platform.type": "seesaw", "pc": "uncertain", "pa": "uncertain", "A.orientation": "horizontal", "platform.dist": "-1", "platform1.height": "-1", "pc_given_a": "high", "dependence.a": "1", "id": "S97-1674", "dependence.c": "1"},
  {"platform2.height": "-1", "platform1.width": "-1", "pa_given_c": "high", "platform2.width": "-1", "C.orientation": "horizontal", "AC.position": "side", "comment1": "such that not sure in which direction the blocks fall; side or stacked, try out", "comment2": "-1", "platform.type": "seesaw", "pc": "high", "pa": "high", "A.orientation": "horizontal", "platform.dist": "-1", "platform1.height": "-1", "pc_given_a": "high", "dependence.a": "dep", "id": "S7-130-dep", "dependence.c": "dep"},
  {"platform2.height": "-1", "platform1.width": "default", "pa_given_c": "low", "platform2.width": "-1", "C.orientation": "horizontal", "AC.position": "stack_A_on_C", "comment1": "pc should be 0, directly on top of platform", "comment2": "-1", "platform.type": "basic1", "pc": "low", "pa": "low", "A.orientation": "horizontal", "platform.dist": "-1", "platform1.height": "default", "pc_given_a": "low", "dependence.a": "dep", "id": "S30-805-dep", "dependence.c": "dep"},
  {"platform2.height": "-1", "platform1.width": "-1", "pa_given_c": "uncertain", "platform2.width": "-1", "C.orientation": "horizontal", "AC.position": "side", "comment1": "one on each side such that unclear whether in balance or not", "comment2": "-1", "platform.type": "seesaw", "pc": "uncertain", "pa": "uncertain", "A.orientation": "horizontal", "platform.dist": "-1", "platform1.height": "-1", "pc_given_a": "uncertain", "dependence.a": "dep", "id": "S89-1642-dep", "dependence.c": "dep"}
]

let id2TrialData = {};

dataAll.forEach(function(trial){
  id2TrialData[trial.id] = trial;
});


// Create a point constraint that pins the center of the plank to fixed point in
// space, so it can't move
platformConstraints = function(platforms) {
  let constraints = [];
  platforms.forEach(function(platform){
    let c = Constraint.create({pointA: {x: platform["position"]["x"], y: platform["position"]["y"]},
                              bodyB: platform,
                              stiffness: 0.7,
                              length: 0,
                              render: {visible: false}
                            });
    c.add2World = true;
    constraints.push(c);
  })
  return constraints
}

makeConstraints = function(pType, mapID2Objs) {
  let constraints = [];

  let platforms = [mapID2Objs.distractorPlatform];
  if (pType == "seesaw"){
    platforms.push(mapID2Objs.seesawStick, mapID2Objs.seesawLink);
    let c1 = Constraint.create({
        pointA: {x: mapID2Objs["seesawPlank"]["position"]["x"],
                 y: mapID2Objs["seesawPlank"]["position"]["y"]},
        bodyB: mapID2Objs["seesawPlank"],
        stiffness: 0.5,
        length: 0,
        render: {visible: true}
      });
    c1.add2World = true;
    constraints.push(c1);

    let c2 = Constraint.create({pointA: {x: mapID2Objs["compoundSeesaw"]["position"]["x"],
                                y: mapID2Objs["compoundSeesaw"]["position"]["y"]},
                                bodyB: mapID2Objs["compoundSeesaw"],
                                stiffness: 0.7,
                                length: 0,
                                render: {visible: false}
                              });
    c2.add2World = true;
    constraints.push(c2);

  } else {
      platforms.push(mapID2Objs.platform1)
      if (pType == "basic2"){
        platforms.push(mapID2Objs.platform2);
      }
    }

  let pConstraints = platformConstraints(platforms);
  constraints = constraints.concat(pConstraints);

  return constraints
}

randomStacked = function(b1, b2, basis){
  let b1Range;
  let b2Range;
  // y values get smaller the closer to the top (0,0)!
  if(b1.y < b2.y){
    // console.log('b1 on b2')
    // b1 on b2 on basis
    b2Range = getMinMax(b2, basis);
    b2.x = randomNbInRange(b2Range);
    b1Range = getMinMax(b1, b2);
    b1.x = randomNbInRange(b1Range);
  } else {
    // console.log('b2 on b1')
    // b2 on b1 on basis
    b1Range = getMinMax(b1, basis)
    b1.x = randomNbInRange(b1Range);
    b2Range = getMinMax(b2, b1);
    b2.x = randomNbInRange(b2Range);
  }
}


randomizeLocationsTraining = function(pType, mapID2Def){
  if(pType !== "basic2"){
    // for basic2 we use predefined high-uncertain or uncertain-high or high - high
    // values to avoid that the first training trial is a trial where nothing
    // actually happens
    // stack random
    let base = pType == "seesaw" ? mapID2Def.plank : mapID2Def.p1;
    randomStacked(mapID2Def.b1, mapID2Def.b2, base);
  }
}

createSceneObjs = function(pType, mapID2Definitions, training){
  let objs = Object.values(mapID2Definitions);
  let map2WorldObjs = {}

  if(training){
    randomizeLocationsTraining(pType, mapID2Definitions, objs);
    let distRange = getMinMax(mapID2Definitions.distractorBlock, mapID2Definitions.distractorPlatform);
    mapID2Definitions.distractorBlock.x = randomNbInRange(distRange);
  }
  objs.forEach(function(obj){
    let block = makeBlock(obj);
    map2WorldObjs[obj.properties.label] = block;
  });

  if(pType == "seesaw"){
    let seesaw = Matter.Body.create({parts: [map2WorldObjs.seesawStick,
                                             map2WorldObjs.seesawLink],
                                     label: "compoundSeesaw"});
    seesaw.add2World = true;
    // only add compound body, not its parts
    map2WorldObjs.seesawStick.add2World = false;
    map2WorldObjs.seesawLink.add2World = false;

    map2WorldObjs.compoundSeesaw = seesaw

  }
  let allSceneObjs = Object.values(map2WorldObjs)

  let constraints = makeConstraints(pType, map2WorldObjs);
  constraints.forEach(function(obj){
    allSceneObjs.push(obj)
  });
  return allSceneObjs
}


// 2. choose and create scene
let idxScene = Math.floor(Math.random()*10)
// idxScene =  9
// console.log(dataAll[idxScene].id)

let allScenes;
let sceneProps;
let worldObjects;

if(MODE === "experiment"){
  allScenes =   getRandomTrainData();

} else {
    if(MODE === "train"){
      allScenes = getRandomTrainData();
      idxScene = Math.floor(Math.random() * allScenes.length);
      // idxScene = 2;
      sceneProps = allScenes[idxScene];
    } else {
      sceneProps = dataAll[idxScene]
      }
    let sceneData = defineScene(sceneProps);
    worldObjects = createSceneObjs(sceneProps["platform.type"], sceneData, MODE === "train");
}
