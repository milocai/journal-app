import { journalSlice } from "../../../src/store/journal"

const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

describe('pruebas en journalSlice', () => {

    test('debe regresar el estado inicial y llamarse journal', () => {
        const state = journalSlice.reducer( initialState, {} )
        expect( state ).toEqual( initialState )
        expect( journalSlice.name ).toBe('journal')
    })

    test('debe poner el isSaving en true', () => {
        const state = journalSlice.reducer( initialState, journalSlice.actions.savingNewNote() )
        expect( state ).toEqual({ ...initialState, isSaving: true })
    })
})