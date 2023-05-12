import { authSlice, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('pruebas en authSlice', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', () => {


        const state = authSlice.reducer( initialState, {} )
        expect( state ).toEqual( initialState )
        expect( authSlice.name ).toBe('auth')

    })

    test('debe realizar la autenticación', () => {

        const state = authSlice.reducer( initialState, login( demoUser ))
        expect(state).toEqual( authenticatedState )

    })

    test('debe realizar el logout (sin argumentos)', () => {

        const state = authSlice.reducer( authenticatedState, logout())
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        })

    })

    test('debe realizar el logout (con argumentos)', () => {

        const errorMessage = 'Credenciales no son correctas'
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }))
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Credenciales no son correctas',
        })

    })

})