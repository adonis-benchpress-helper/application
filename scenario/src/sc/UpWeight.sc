theme: /
    state: UpWeight
        q!: (Увеличь | повысь | подними | сделай больше | сделай выше) (вес | килограммы)
        script:
            log('UpWeight: context: ' + JSON.stringify($context))
            increaseWeight( $context);
        a: Вес увеличен!