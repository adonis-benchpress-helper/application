require: js/getters.js
require: js/reply.js
require: js/calcMax.js

require: sc/setWeight.sc
require: sc/setReps.sc
require: sc/calculateMax.sc

patterns:
    $AnyText = $nonEmptyGarbage
    $number = ([1-9][0-9]*|100|[1-9][0-9]+[0-9]*)

theme: /
    state: Start
        # При запуске приложения с кнопки прилетит сообщение /start.
        q!: $regex</start>
        q!: (запусти | открой | вруби | включи | запусти) (калькулятор жима лежа | Адонис | адонис) 
        a: Вас приветсвует Адонис - калькулятор вашего жима лежа на раз.

    state: Fallback
        event!: noMatch
        script:
            log('entryPoint: Fallback: context: ' + JSON.stringify($context))
        a: Я не понимаю
        