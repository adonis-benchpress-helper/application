theme: /
    state: SetWeight
        q!: (установи вес | выставь вес | мой вес | мой вес на штанге) $number::weight (килограмм | кг | киллограммов)
        script:
            log('SetWeight: context: ' + JSON.stringify($context))
            $context.weight = $parseTree.weight; 
            setWeight($context.weight, $context); 
        a: Вес установлен! 

