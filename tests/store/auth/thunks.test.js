import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../../src/firebase/providers"
import { checkingCredentials, login, logout, startGoogleSignIn } from "../../../src/store/auth"
import { checkingAuthetication, startCreatingUserWithEmailAndPassword, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice"
import { demoUser } from "../../fixtures/authFixtures"


jest.mock('../../../src/firebase/providers')

describe('pruebas en Auth thunks', () => {
   
    const dispatch = jest.fn()

    beforeEach( () => jest.clearAllMocks() )

    test('debe invocar el checkingCredentials', async() => {
        await checkingAuthetication()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
    })

    test('startGoogleSignIn debe llamar al checkingCredentials y login - EXITO', async() => {
        const loginData = {
            ok: true,
            ...demoUser
        }

        await signInWithGoogle.mockResolvedValue( loginData )
        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
    }) 

    test('startGoogleSignIn debe llamar al checkingCredentials y logout - ERROR', async() => {
        const loginData = {
            ok: false,
            errorMessage: 'Un error en Google'
        }

        await signInWithGoogle.mockResolvedValue( loginData )
        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) )
    }) 

    test('startLoginWithEmailPassword debe llamar checkingCredentials y login - EXITO', async() => {

        const loginData = { ok: true, ...demoUser }

        const formData = { email: demoUser.email, password: '123456' }

        await loginWithEmailPassword.mockResolvedValue( loginData )
        await startLoginWithEmailPassword( formData )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )

    })

    test('startLoginWithEmailPassword debe llamar checkingCredentials y logout - ERROR', async() => {
        
        const loginData = { ok: false, errorMessage: 'Credenciales no son correctas'}
        
        await loginWithEmailPassword.mockResolvedValue( loginData )
        await startLoginWithEmailPassword( demoUser.email, '123123')( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) )
    })

    test('startCreatingUserWithEmailAndPassword debe llamar checkingCredentials y login - EXITO', async() => {
        
        const formData = { ok: true, ...demoUser }

        await registerUserWithEmailAndPassword.mockResolvedValue( formData )
        await startCreatingUserWithEmailAndPassword( demoUser )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) )

    })

    test('startCreatingUserWithEmailAndPassword debe llamar checkingCredentials y logout - ERROR', async() => {
        
        const formData = { ok: false, errorMessage: 'Credenciales no son correctas' }

        await registerUserWithEmailAndPassword.mockResolvedValue( formData )
        await startCreatingUserWithEmailAndPassword( demoUser )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage: 'Credenciales no son correctas'} ) )

    })

    test('startLogout debe llamar logoutFirebase, clearNotes y logout', async() => {
        await startLogout()( dispatch )

        expect( logoutFirebase ).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith( clearNotesLogout() )
        expect(dispatch).toHaveBeenCalledWith( logout() )
    })

})