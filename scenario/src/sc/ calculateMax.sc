theme: /
    state: CalculateMax
        q!: (вычисли | посчитай | рассчитай) максимум
        script:
            log('CalculateMax: context: ' + JSON.stringify($context))
            sendAction('calculate_max', {})
        a: Ваш одноповторный максимум составляет {$context.maxWeight} килограммов.
