theme: /
    state: DownWeight
        q!: (Уменьши) (вес)
        script:
            log('DownWeight: context: ' + JSON.stringify($context))
            decreaseWeight($context);
        a: Вес уменьшен!