function setWeight(weight, context) {
    addAction({
        type: "set_weight",
        weight: weight,
    }, context);
}

function setReps(reps, context) {
    addAction({
        type: "set_reps",
        reps: reps,
    }, context);
}

function calculateMax(weight, reps, context) {
    addAction({
        type: "calculate_max",
        weight: weight,
        reps: reps
    }, context);
}