theme: /
    state: UpReps
        q!: (Увеличь) (повторы)
        script:
            log('UpReps: context: ' + JSON.stringify($context))
            increaseReps($context);
        a: Повторы увеличены!