theme: /
    state: SetReps
        q!: (установи количество повторений | выставь количество повторений) {number}
        context: (reps = $number)
        script:
            log('SetReps: context: ' + JSON.stringify($context))
            sendAction('set_reps', {reps: $context.reps})
        a: Количество повторений установлено на {$context.reps}.