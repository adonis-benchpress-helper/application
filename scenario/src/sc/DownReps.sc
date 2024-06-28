theme: /
    state: DownReps
        q!: (Уменьши) (повторы)
        script:
            log('DownReps: context: ' + JSON.stringify($context))
            decreaseReps($context);
        a: Повторы уменьшены!