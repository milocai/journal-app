import { useEffect, useMemo, useState } from "react"


export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm )
    const [ formErrors, setFormErrors ] = useState( {} )
    
    useEffect(() => {
      createValidators()
    }, [ formState ])
    
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formErrors)) {
            if(formErrors[formValue] !== null) return false
        }
        return true
    }, [formErrors])
  
    const onInputChange = ({ target }) => {
        const { name, value } = target
        setFormState({
            ...formState,
            [ name ]: value
        })
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }
    
    const createValidators = () => {
        const formCheckedValues = {}

        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations [ formField ]

            formCheckedValues[ `${formField}Valid` ] = fn( formState[ formField ]) ? null : errorMessage
        }

        setFormErrors( formCheckedValues )
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formErrors,
        isFormValid
    }
}