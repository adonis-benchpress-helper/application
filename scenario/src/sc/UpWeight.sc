theme: /
    state: UpWeight
        q!: (Увеличь) (вес)
        script:
            log('UpWeight: context: ' + JSON.stringify($context))
            increaseWeight( $context);
        a: Вес увеличен!