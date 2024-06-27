theme: /
    state: SetReps
        q!: (установи количество повторений | выставь количество повторений | мое количество повторений) $number::reps
        script:
            log('SetWeight: context: ' + JSON.stringify($context))
            $context.reps = $parseTree.reps; 
            setReps($context.reps, $context); 
        a: Повторения установлены!

