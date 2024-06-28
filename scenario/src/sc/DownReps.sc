theme: /
    state: DownReps
        q!: (Уменьши | понизь | снизь | уменьшь) (повторы | повторения | количество повторений | количество повторов | кол-во повторов | кол-во повторений | разы)
        script:
            log('DownReps: context: ' + JSON.stringify($context))
            decreaseReps($context);
        a: Повторы уменьшены!