require: js/getters.js
require: js/reply.js
require: js/calcMax.js

require: sc/UpWeight.sc
require: sc/DownWeight.sc
require: sc/UpReps.sc
require: sc/DownReps.sc
require: sc/calcMax.sc

patterns:
    $AnyText = $nonEmptyGarbage

theme: /
    state: Start
        q!: $regex</start>
        q!: (запусти | открой | вруби | включи | запусти) (калькулятор жима лежа | Адонис | адонис)
        a: Вас приветствует Адонис - калькулятор вашего жима лежа на раз.

    state: Fallback
        event!: noMatch
        script:
            log('entryPoint: Fallback: context: ' + JSON.stringify($context))
        a: Я не понимаю