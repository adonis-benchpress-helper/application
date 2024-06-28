theme: /
    state: DownWeight
        q!: (Уменьши | понизь | снизь | уменьшь) (вес | килограммы )
        script:
            log('DownWeight: context: ' + JSON.stringify($context))
            decreaseWeight($context);
        a: Вес уменьшен!