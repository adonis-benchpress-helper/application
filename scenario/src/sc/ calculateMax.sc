theme: /
    state: CalculateMax
        q!: (вычисли | посчитай | рассчитай) (максимум | мой максимум | мой максимальный жим | жим лежа на максимум | вес который я могу пожать) 
        a: Хорошо, сейчас мы узнаем сколько вы можете пожать на один раз. 

        random:
            a: Расчитано!
            a: Получите результат!

        script:
            log('CalculateMax: context: ' + JSON.stringify($context))
            calcMax($context)



