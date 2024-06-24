theme: /
    state: SetWeight
        q!: (установи вес | выставь вес) {number}
        context: (weight = $number)
        script:
            log('SetWeight: context: ' + JSON.stringify($context))
            sendAction('set_weight', {weight: $context.weight})
        a: Вес установлен на {$context.weight} килограммов.
