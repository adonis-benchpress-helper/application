require: slotfilling/slotFilling.sc
module = sys.zb-common

# Подключение javascript обработчиков
require: js/getters.js
require: js/reply.js
require: js/actions.js

# Подключение сценарных файлов
require: sc/setWeight.sc
require: sc/setReps.sc
require: sc/calculateMax.sc

patterns:
    $AnyText = $nonEmptyGarbage

theme: /
    state: Start
        q!: $regex</start>
        q!: (запусти | открой | вруби) калькулятор веса
        a: Начнём. Какой вес штанги вы хотите установить?

    state: Fallback
        event!: noMatch
        script:
            log('entryPoint: Fallback: context: ' + JSON.stringify($context))
        a: Я не понимаю, повторите, пожалуйста.

