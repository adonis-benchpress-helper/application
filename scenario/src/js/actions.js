// function set_weight(context, action) {
//     const weight = action.weight;
//     context.state.weight = weight;
//     context.response = {
//         type: 'simple_text',
//         body: {
//             text: `Вес установлен на ${weight} килограммов.`
//         }
//     };
// }

// function set_reps(context, action) {
//     const reps = action.reps;
//     context.state.reps = reps;
//     context.response = {
//         type: 'simple_text',
//         body: {
//             text: `Количество повторений установлено на ${reps}.`
//         }
//     };
// }

// function calculate_max(context) {
//     const weight = context.state.weight;
//     const reps = context.state.reps;
//     const maxWeight = Math.ceil(calculate_max(weight, reps));
//     context.state.maxWeight = maxWeight;
//     context.response = {
//         type: 'simple_text',
//         body: {
//             text: `Ваш одноповторный максимум составляет ${maxWeight} килограммов.`
//         }
//     };
// }


function set_weight(context, action) {
    const weight = action.weight;
    context.state.weight = weight;
    context.response = {
        type: 'simple_text',
        body: {
            text: `Вес установлен на ${weight} килограммов.`
        }
    };
}

function set_reps(context, action) {
    const reps = action.reps;
    context.state.reps = reps;
    context.response = {
        type: 'simple_text',
        body: {
            text: `Количество повторений установлено на ${reps}.`
        }
    };
}

function calculate_max(context) {
    const weight = context.state.weight;
    const reps = context.state.reps;
    const maxWeight = Math.ceil(calculate_max(weight, reps));
    context.state.maxWeight = maxWeight;
    context.response = {
        type: 'simple_text',
        body: {
            text: `Ваш одноповторный максимум составляет ${maxWeight} килограммов.`
        }
    };
}

module.exports = { set_weight, set_reps, calculate_max };

